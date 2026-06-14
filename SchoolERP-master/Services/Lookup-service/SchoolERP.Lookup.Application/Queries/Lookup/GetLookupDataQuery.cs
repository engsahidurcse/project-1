using MediatR;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Lookup.Application.DTOs.Lookup;
using SchoolERP.Lookup.Infrastructure.Persistence;
using SchoolERP.Shared.Responses;

namespace SchoolERP.Lookup.Application.Queries.GetLookupData;

// MediatR Query Matrix
public record GetLookupDataQuery(int LookUpTypeId, int OrganizationId) : IRequest<ApiResponse<List<LookupResponseDto>>>;

// MediatR Handler Execution Pipeline
public class GetLookupDataQueryHandler : IRequestHandler<GetLookupDataQuery, ApiResponse<List<LookupResponseDto>>>
{
    private readonly LookupDbContext _context; // 🎯 Direct DbContext access for optimized query execution

    public GetLookupDataQueryHandler(LookupDbContext context) => _context = context;

    public async Task<ApiResponse<List<LookupResponseDto>>> Handle(GetLookupDataQuery request, CancellationToken cancellationToken)
    {
        // 1. Build the query blueprint without pulling data into memory (Server-side execution)
        var query = from a in _context.LookUpDatas
                    where (request.LookUpTypeId == 0 || a.LookUpTypeId == request.LookUpTypeId) && a.Active == 1

                    // Inner join with LookUpTypeDatas matrix to ensure the type is active
                    join b in _context.LookUpTypeDatas on a.LookUpTypeId equals b.Id
                    where b.Active == 1

                    // Left join with OrganizationWithTableRowData using composite tracking keys
                    join c in _context.OrganizationWithTableRowDatas
                         on new { TableRowId = a.Id, TableName = "LookUpDatas" }
                         equals new { c.TableRowId, TableName = "LookUpDatas" }
                         into orgData

                    from c in orgData.DefaultIfEmpty() // Execute Left Join

                        // Allow global items (null) OR strict matrix validation if mapped OR bypass if OrganizationId is 0
                    where request.OrganizationId == 0 || c == null || (c.OrganizationId == request.OrganizationId && c.IsNeed == 0)

                    // Project the database entity straight into the clean DTO baseline
                    select new LookupResponseDto(
                        a.Id,
                        a.LookUpCode,
                        a.LookUpName,
                        a.LookUpBDName,
                        a.LookUpSymbol,
                        b.LookUpTypeName
                    );

        // 2. Execute a single high-performance database trip with tracking disabled for optimized read speed
        var lookupRows = await query.AsNoTracking().ToListAsync(cancellationToken);

        // 🎯 Defensive Fix: Safely extract type name if data exists, otherwise use a default message
        var firstRow = lookupRows.FirstOrDefault();
        string successMessage = firstRow != null
            ? $"{firstRow.LookUpTypeName} data retrieved successfully!"
            : "Lookup data retrieved successfully!";

        return new ApiResponse<List<LookupResponseDto>>(
            Success: true,
            StatusCode: 200,
            Message: successMessage,
            Data: lookupRows
        );
    }
}
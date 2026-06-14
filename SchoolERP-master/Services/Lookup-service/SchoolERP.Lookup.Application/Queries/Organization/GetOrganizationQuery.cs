using MediatR;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Lookup.Application.DTOs.Organization;
using SchoolERP.Lookup.Infrastructure.Persistence;
using SchoolERP.Shared.Responses;

namespace SchoolERP.Lookup.Application.Queries.Organization;

public record GetOrganizationQuery() : IRequest<ApiResponse<List<OrganizationListDto>>>;

public class GetOrganizationListQueryHandler : IRequestHandler<GetOrganizationQuery, ApiResponse<List<OrganizationListDto>>>
{
    private readonly LookupDbContext _context; // Replace with your actual DbContext name
    public GetOrganizationListQueryHandler(LookupDbContext context) => _context = context;

    public async Task<ApiResponse<List<OrganizationListDto>>> Handle(GetOrganizationQuery request, CancellationToken cancellationToken)
    {
        // 🎯 SOFT DELETE FILTER: Only pull records where ClosedDate is null
        var organizations = await _context.OrganizationDatas
            .Include(x => x.Parent) // Safe Eager Loading for hierarchy name mapping
            .Where(x => x.ClosedDate == null)
            .Select(x => new OrganizationListDto(
                x.Id,
                x.RegistrationNo,
                x.OrganizationName,
                x.Email,
                x.Address,
                x.Phone,
                x.Website,
                x.LicensedUpto,
                x.StartDate,
                x.ParentId,
                x.Parent != null ? x.Parent.OrganizationName : null
            ))
            .ToListAsync(cancellationToken);

        return new ApiResponse<List<OrganizationListDto>>(true, 200, "Organization list retrieved successfully!", organizations);
    }
}
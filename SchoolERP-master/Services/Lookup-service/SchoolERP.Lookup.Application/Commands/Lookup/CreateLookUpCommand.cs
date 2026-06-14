using MediatR;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Lookup.Application.DTOs.Lookup;
using SchoolERP.Lookup.Domain.Entities;
using SchoolERP.Lookup.Infrastructure.Persistence;
using SchoolERP.Shared.Responses; // Assuming your standardized ApiResponse template lives here

namespace SchoolERP.Lookup.Application.Commands.Lookup;

// ==========================================
// 1. INSERT COMMAND & HANDLER
// ==========================================
public record CreateLookUpCommand(CreateLookUpRequest Request) : IRequest<ApiResponse<int>>;

public class CreateLookUpCommandHandler : IRequestHandler<CreateLookUpCommand, ApiResponse<int>>
{
    private readonly LookupDbContext _context; // Replace with your actual DbContext name
    public CreateLookUpCommandHandler(LookupDbContext context) => _context = context;

    public async Task<ApiResponse<int>> Handle(CreateLookUpCommand request, CancellationToken cancellationToken)
    {
        var req = request.Request;

        var lookup = new LookUpData
        {
            SerialNo = req.SerialNo,
            LookUpCode = req.LookUpCode,
            LookUpName = req.LookUpName,
            LookUpBDName = req.LookUpBDName,
            LookUpSymbol = req.LookUpSymbol,
            ParentId = req.ParentId,
            DDLFirstId = req.DDLFirstId,
            LookUpTypeId = req.LookUpTypeId,
            IsEntryForm = req.IsEntryForm,
            Active = 1 // Default active state for fresh records
        };

        _context.LookUpDatas.Add(lookup);
        await _context.SaveChangesAsync(cancellationToken);

        return new ApiResponse<int>(true, 201, "Lookup record created successfully!", lookup.Id);
    }
}
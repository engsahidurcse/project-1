using MediatR;
using SchoolERP.Lookup.Application.DTOs.Organization;
using SchoolERP.Lookup.Domain.Entities;
using SchoolERP.Lookup.Infrastructure.Persistence;
using SchoolERP.Shared.Responses;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Shared.Entities;

namespace SchoolERP.Lookup.Application.Commands.Organization;

// ==========================================
// 1. INSERT COMMAND & HANDLER
// ==========================================
public record CreateOrganizationCommand(CreateOrganizationRequest Request) : IRequest<ApiResponse<int>>;

public class CreateOrganizationCommandHandler : IRequestHandler<CreateOrganizationCommand, ApiResponse<int>>
{
    private readonly LookupDbContext _context; // Replace with your actual DbContext
    public CreateOrganizationCommandHandler(LookupDbContext context) => _context = context;

    public async Task<ApiResponse<int>> Handle(CreateOrganizationCommand request, CancellationToken cancellationToken)
    {
        var req = request.Request;

        // ParentId Validation check if provided
        if (req.ParentId.HasValue && req.ParentId.Value > 0)
        {
            var parentExists = await _context.OrganizationDatas.AnyAsync(x => x.Id == req.ParentId, cancellationToken);
            if (!parentExists)
                throw new Exception($"Parent Organization with ID {req.ParentId} does not exist.");
        }

        var org = new OrganizationData
        {
            RegistrationNo = req.RegistrationNo,
            OrganizationName = req.OrganizationName,
            Email = req.Email,
            Address = req.Address,
            Phone = req.Phone,
            Website = req.Website,
            LicensedUpto = req.LicensedUpto,
            StartDate = req.StartDate,
            ParentId = req.ParentId > 0 ? req.ParentId : null,
            ClosedDate = null // Fresh org is not closed
        };

        _context.OrganizationDatas.Add(org);
        await _context.SaveChangesAsync(cancellationToken);

        return new ApiResponse<int>(true, 201, "Organization registered successfully!", org.Id);
    }
}
using MediatR;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Lookup.Application.DTOs.Organization;
using SchoolERP.Lookup.Infrastructure.Persistence;
using SchoolERP.Shared.Responses;

namespace SchoolERP.Lookup.Application.Commands.Organization;

// ==========================================
// 2. UPDATE COMMAND & HANDLER
// ==========================================
public record UpdateOrganizationCommand(UpdateOrganizationRequest Request) : IRequest<ApiResponse<bool>>;

public class UpdateOrganizationCommandHandler : IRequestHandler<UpdateOrganizationCommand, ApiResponse<bool>>
{
    private readonly LookupDbContext _context;
    public UpdateOrganizationCommandHandler(LookupDbContext context) => _context = context;

    public async Task<ApiResponse<bool>> Handle(UpdateOrganizationCommand request, CancellationToken cancellationToken)
    {
        var req = request.Request;

        // Prevent infinite loops in hierarchy tree
        if (req.ParentId == req.Id)
            throw new Exception("An organization cannot be its own parent.");

        var org = await _context.OrganizationDatas
            .FirstOrDefaultAsync(x => x.Id == req.Id, cancellationToken);

        if (org == null)
            throw new Exception($"Organization with ID {req.Id} not found!");

        org.RegistrationNo = req.RegistrationNo;
        org.OrganizationName = req.OrganizationName;
        org.Email = req.Email;
        org.Address = req.Address;
        org.Phone = req.Phone;
        org.Website = req.Website;
        org.LicensedUpto = req.LicensedUpto;
        org.StartDate = req.StartDate;
        org.ClosedDate = req.ClosedDate;
        org.ParentId = req.ParentId > 0 ? req.ParentId : null;

        await _context.SaveChangesAsync(cancellationToken);

        return new ApiResponse<bool>(true, 200, "Organization updated successfully!", true);
    }
}

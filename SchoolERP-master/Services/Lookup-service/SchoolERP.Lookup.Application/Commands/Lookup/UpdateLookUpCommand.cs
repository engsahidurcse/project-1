using MediatR;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Lookup.Application.DTOs.Lookup;
using SchoolERP.Lookup.Infrastructure.Persistence;
using SchoolERP.Shared.Responses;

namespace SchoolERP.Lookup.Application.Commands.Lookup;

// ==========================================
// 2. UPDATE COMMAND & HANDLER
// ==========================================
public record UpdateLookUpCommand(UpdateLookUpRequest Request) : IRequest<ApiResponse<bool>>;

public class UpdateLookUpCommandHandler : IRequestHandler<UpdateLookUpCommand, ApiResponse<bool>>
{
    private readonly LookupDbContext _context;
    public UpdateLookUpCommandHandler(LookupDbContext context) => _context = context;

    public async Task<ApiResponse<bool>> Handle(UpdateLookUpCommand request, CancellationToken cancellationToken)
    {
        var req = request.Request;

        var lookup = await _context.LookUpDatas
            .FirstOrDefaultAsync(x => x.Id == req.Id, cancellationToken);

        if (lookup == null)
            throw new Exception($"Lookup record with ID {req.Id} not found!");

        // Update the operational system values cleanly
        lookup.SerialNo = req.SerialNo;
        lookup.LookUpCode = req.LookUpCode;
        lookup.LookUpName = req.LookUpName;
        lookup.LookUpBDName = req.LookUpBDName;
        lookup.LookUpSymbol = req.LookUpSymbol;
        lookup.ParentId = req.ParentId;
        lookup.DDLFirstId = req.DDLFirstId;
        lookup.LookUpTypeId = req.LookUpTypeId;
        lookup.IsEntryForm = req.IsEntryForm;
        lookup.Active = req.Active;

        await _context.SaveChangesAsync(cancellationToken);

        return new ApiResponse<bool>(true, 200, "Lookup record updated successfully!", true);
    }
}

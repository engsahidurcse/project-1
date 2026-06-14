using MediatR;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Lookup.Infrastructure.Persistence;
using SchoolERP.Shared.Responses;

namespace SchoolERP.Lookup.Application.Commands.Lookup;

// ==========================================
// 3. SOFT DELETE COMMAND & HANDLER
// ==========================================
public record DeleteLookUpCommand(int Id) : IRequest<ApiResponse<bool>>;

public class DeleteLookUpCommandHandler : IRequestHandler<DeleteLookUpCommand, ApiResponse<bool>>
{
    private readonly LookupDbContext _context;
    public DeleteLookUpCommandHandler(LookupDbContext context) => _context = context;

    public async Task<ApiResponse<bool>> Handle(DeleteLookUpCommand request, CancellationToken cancellationToken)
    {
        var lookup = await _context.LookUpDatas
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (lookup == null)
            throw new Exception($"Lookup record with ID {request.Id} not found!");

        // 🎯 SOFT DELETE MATRIX: Set Active flag to 0 instead of dropping row physically from db fabric
        lookup.Active = 0;

        await _context.SaveChangesAsync(cancellationToken);

        return new ApiResponse<bool>(true, 200, "Lookup record safely archived (Soft Deleted)!", true);
    }
}
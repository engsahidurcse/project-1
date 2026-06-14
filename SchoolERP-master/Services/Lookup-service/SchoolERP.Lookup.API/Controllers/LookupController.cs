using MediatR;
using Microsoft.AspNetCore.Mvc;
using SchoolERP.Lookup.Application.Commands.Lookup;
using SchoolERP.Lookup.Application.DTOs.Lookup;
using SchoolERP.Lookup.Application.Queries.GetLookupData;

namespace SchoolERP.Lookup.API.Controllers;

[ApiController]
[Route("api/lookup/lookup")] // 🎯 FIXED: Removed '[controller]' to keep clean and unify routing with Gateway
public class LookupDataController : ControllerBase
{
    private readonly IMediator _mediator;
    public LookupDataController(IMediator mediator) => _mediator = mediator;

    /// <summary>
    /// Retrieves filtered or global lookup data based on Type ID and Organization ID.
    /// </summary>
    /// <param name="lookUpTypeId">Pass 0 to fetch all types, or a specific ID for filtering</param>
    /// <param name="organizationId">Pass 0 to bypass matrix mapping, or a specific ID to filter by organization permission</param>
    // 🚀 GET: api/lookup/GetLookupData
    [HttpGet("GetLookupData")]
    public async Task<IActionResult> GetLookupData([FromQuery] int lookUpTypeId = 0, [FromQuery] int organizationId = 0)
    {
        // Route the query object through MediatR pipeline straight to the handler
        var query = new GetLookupDataQuery(lookUpTypeId, organizationId);
        var result = await _mediator.Send(query);

        // Standardized API baseline response handling
        return result.Success ? Ok(result) : BadRequest(result);
    }

    // 🚀 POST: api/lookup/create
    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] CreateLookUpRequest request)
    {
        var response = await _mediator.Send(new CreateLookUpCommand(request));
        return StatusCode(response.StatusCode, response);
    }

    // 🚀 PUT: api/lookup/update
    [HttpPut("update")]
    public async Task<IActionResult> Update([FromBody] UpdateLookUpRequest request)
    {
        var response = await _mediator.Send(new UpdateLookUpCommand(request));
        return StatusCode(response.StatusCode, response);
    }

    // 🚀 DELETE: api/lookup/delete/{id}
    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> SoftDelete(int id)
    {
        var response = await _mediator.Send(new DeleteLookUpCommand(id));
        return StatusCode(response.StatusCode, response);
    }
}
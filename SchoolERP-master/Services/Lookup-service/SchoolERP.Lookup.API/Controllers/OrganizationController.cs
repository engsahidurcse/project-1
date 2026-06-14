using MediatR;
using Microsoft.AspNetCore.Mvc;
using SchoolERP.Lookup.Application.Commands.Organization;
using SchoolERP.Lookup.Application.DTOs.Organization;
using SchoolERP.Lookup.Application.Queries.Organization; // 🎯 Added namespace

namespace SchoolERP.Lookup.API.Controllers;

[ApiController]
[Route("api/lookup/organization")]
public class OrganizationController : ControllerBase
{
    private readonly IMediator _mediator;
    public OrganizationController(IMediator mediator) => _mediator = mediator;

    // 🚀 GET: api/organization
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var response = await _mediator.Send(new GetOrganizationQuery());
        return StatusCode(response.StatusCode, response);
    }

    // 🚀 POST: api/organization/create
    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] CreateOrganizationRequest request)
    {
        var response = await _mediator.Send(new CreateOrganizationCommand(request));
        return StatusCode(response.StatusCode, response);
    }

    // 🚀 PUT: api/organization/update
    [HttpPut("update")]
    public async Task<IActionResult> Update([FromBody] UpdateOrganizationRequest request)
    {
        var response = await _mediator.Send(new UpdateOrganizationCommand(request));
        return StatusCode(response.StatusCode, response);
    }
}
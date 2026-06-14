namespace SchoolERP.Lookup.Application.DTOs.Organization;

public record UpdateOrganizationRequest(
    int Id,
    string RegistrationNo,
    string OrganizationName,
    string Email,
    string Address,
    string Phone,
    string Website,
    DateTime LicensedUpto,
    DateTime StartDate,
    DateTime? ClosedDate,
    int? ParentId
);

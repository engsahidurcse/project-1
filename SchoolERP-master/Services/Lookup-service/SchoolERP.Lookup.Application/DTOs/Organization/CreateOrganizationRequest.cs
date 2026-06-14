namespace SchoolERP.Lookup.Application.DTOs.Organization;

public record CreateOrganizationRequest(
    string RegistrationNo,
    string OrganizationName,
    string Email,
    string Address,
    string Phone,
    string Website,
    DateTime LicensedUpto,
    DateTime StartDate,
    int? ParentId
);

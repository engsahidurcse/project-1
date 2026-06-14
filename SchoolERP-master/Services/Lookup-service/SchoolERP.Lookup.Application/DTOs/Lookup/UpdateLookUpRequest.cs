namespace SchoolERP.Lookup.Application.DTOs.Lookup;

public record UpdateLookUpRequest(
    int Id,
    int SerialNo,
    string LookUpCode,
    string LookUpName,
    string LookUpBDName,
    string LookUpSymbol,
    int ParentId,
    int DDLFirstId,
    int LookUpTypeId,
    int IsEntryForm,
    int Active
);

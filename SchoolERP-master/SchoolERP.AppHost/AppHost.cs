var builder = DistributedApplication.CreateBuilder(args);

// ===================================================================================
// 🛡️ 1. Register Core API Services into Aspire Orchestrator
// ===================================================================================
var authApi = builder.AddProject<Projects.SchoolERP_Auth_API>("auth-api");
var examApi = builder.AddProject<Projects.SchoolERP_Exam_API>("exam-api");
var financeApi = builder.AddProject<Projects.SchoolERP_Finance_API>("finance-api");
var lookupApi = builder.AddProject<Projects.SchoolERP_Lookup_API>("lookup-api");

// Student API with High Availability (2 Replicas) for Load Balancing
var studentApi = builder.AddProject<Projects.SchoolERP_Student_API>("student-api")
                        .WithReplicas(2);

// ===================================================================================
// 🌐 2. Register Central API Gateway and Inject Backend Microservice References Automatically
// ===================================================================================
builder.AddProject<Projects.SchoolERP_Gateway>("api-gateway")
       .WithReference(authApi)
       .WithReference(examApi)
       .WithReference(financeApi)
       .WithReference(lookupApi)
       .WithReference(studentApi);

// 🚀 Start Aspire Dashboard & Launch All Microservices Pipelines
builder.Build().Run();
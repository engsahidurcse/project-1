using SchoolERP.Lookup.API;
using SchoolERP.Shared.Middleware;

var builder = WebApplication.CreateBuilder(args);

// 1. Inject all lookup microservice dependencies using clean Extension Method matrix
builder.Services.AddLookupServiceDependencies(builder.Configuration);

var app = builder.Build();

// 2. 🎯 CRITICAL GUARD: Enforce Gateway Handshake immediately at the front door.
// Blocks direct malicious endpoint access before consuming any routing or CORS resources.
app.EnforceGatewayOnly();

// 3. Global Exception Middleware (Captures downstream CQRS or validation failures safely)
app.UseGlobalExceptionMapping();

// 4. Setup standard routing baseline
app.UseRouting();

// 5. Enable Cross-Origin Resource Sharing policy
app.UseCors("AllowLookUp");

// 6. Security pipeline execution matrix (Essential for parsing Authorization contexts)
app.UseAuthentication();
app.UseAuthorization();

// 7. Map and bind Lookup Web API endpoints matrix
app.MapControllers();

app.Run();
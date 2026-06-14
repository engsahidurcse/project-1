using SchoolERP.Auth.API;
using SchoolERP.Shared.Middleware;

var builder = WebApplication.CreateBuilder(args);

// 1. Inject all dependencies using clean Extension Method matrix
builder.Services.AddAuthServiceDependencies(builder.Configuration);

var app = builder.Build();

// 2. Setup standard routing baseline
app.UseRouting();

// 3. Enable Cross-Origin Resource Sharing policy
app.UseCors("AllowLookUp");

// 4. Enforce Gateway Handshake (Blocks direct malicious endpoint access bypassing YARP)
app.EnforceGatewayOnly();

// 5. Global Exception Middleware (Captures downstream CQRS or validation failures safely)
app.UseGlobalExceptionMapping();

// 6. Security pipeline execution matrix
app.UseAuthentication();
app.UseAuthorization();

// 7. Map and bind Web API endpoints
app.MapControllers();

app.Run();
//using SchoolERP.Auth.API;
//using SchoolERP.Shared.Middleware; // 🎯 1. Import the shared middleware namespace

//var builder = WebApplication.CreateBuilder(args);

//// 2. Inject all dependencies using our clean Extension Method matrix
//builder.Services.AddAuthServiceDependencies(builder.Configuration);

//var app = builder.Build();

//// 3. Request Pipeline Middleware Ordering
//app.UseRouting();

//// 🎯 4. Global Exception Middleware (Must be placed right after UseRouting and BEFORE Auth/Controllers)
//app.UseGlobalExceptionMapping();

//app.UseCors("AllowAll");

//// 5. Enforce Gateway Handshake (Blocks direct malicious endpoint access)
//app.EnforceGatewayOnly();

//app.UseAuthentication();
//app.UseAuthorization();

//app.MapControllers();

//app.Run();

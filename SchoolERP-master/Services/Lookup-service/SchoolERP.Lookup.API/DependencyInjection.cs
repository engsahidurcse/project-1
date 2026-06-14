using Microsoft.EntityFrameworkCore;
using SchoolERP.Lookup.Application.DTOs.Lookup;
using SchoolERP.Lookup.Infrastructure.Persistence;

namespace SchoolERP.Lookup.API;

public static class DependencyInjection
{
    public static IServiceCollection AddLookupServiceDependencies(this IServiceCollection services, IConfiguration configuration)
    {
        // 1. Core Web API Controllers and Routing Services
        services.AddControllers();

        // 2. Database Layer Integration targeting the LookupDbContext matrix
        services.AddDbContext<LookupDbContext>(options =>
            options.UseSqlServer(
                configuration.GetConnectionString("Lookup_Connection"), // 🎯 default connection string for Lookup Service
                b => b.MigrationsAssembly("SchoolERP.Lookup.Infrastructure") // 🎯 targeting the Infrastructure assembly for EF Core Migrations
            ));

        // 4. MediatR Configuration for CQRS Architecture (Targeting the Application Assembly)
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(LookupResponseDto).Assembly));

        // 5. Inject Centralized Authentication/Authorization policies from Shared Extension Matrix
        services.AddSharedAuthentication();

        // 6. Local CORS Configuration specific to this API Service
        services.AddCors(options =>
        {
            options.AddPolicy("AllowLookUp", b => b.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
        });

        return services;
    }
}
using Microsoft.EntityFrameworkCore;
using SchoolERP.Auth.Application.DTOs;
using SchoolERP.Auth.Infrastructure.Identity;
using SchoolERP.Auth.Infrastructure.Persistence;
using StackExchange.Redis;

namespace SchoolERP.Auth.API;

public static class DependencyInjection
{
    public static IServiceCollection AddAuthServiceDependencies(this IServiceCollection services, IConfiguration configuration)
    {
        // 1. Core Web API Controllers and Routing Services
        services.AddControllers();

        // 2. Database Layer Integration (Using exact AppSettings key with Migrations Assembly Rule)
        services.AddDbContext<AuthDbContext>(options =>
            options.UseSqlServer(
                configuration.GetConnectionString("Auth_Connection"),
                b => b.MigrationsAssembly("SchoolERP.Auth.Infrastructure")
            ));

        //3. Register Singleton ConnectionMultiplexer for safe persistent cross-thread pool execution
        var redisConnectionString = configuration.GetConnectionString("RedisConnection") ?? "localhost:6379";
        services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect(redisConnectionString));


        // 4. Application Services & Identity Helpers Dependency Injection
        services.AddScoped<PasswordService>();
        services.AddScoped<JwtService>();

        // 5. MediatR Configuration for CQRS Architecture
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(UserRegisterRequest).Assembly));

        // 6. Inject Centralized Authentication from Shared Extension Matrix
        services.AddSharedAuthentication();

        // 7. Local CORS Configuration specific to this API Service
        services.AddCors(options =>
        {
            options.AddPolicy("AllowAll", b => b.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
        });

        return services;
    }
}
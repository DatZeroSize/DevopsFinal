using DevopsFinal.Data;
using DotNetEnv;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
{
    Env.Load("/app/.env");
}

// Log after loading .env
Console.WriteLine("After loading .env:");
Console.WriteLine("ASPNETCORE_ENVIRONMENT: " + Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT"));
Console.WriteLine("ConnectionStrings__DefaultConnectionString: " + Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnectionString"));

builder.Configuration.Sources.Clear();
builder.Configuration.AddEnvironmentVariables();

builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<DevopsFinalContext>(options =>
    options.UseSqlServer(builder.Configuration["ConnectionStrings:DefaultConnectionString"] ??
        throw new InvalidOperationException("Connection string 'DefaultConnectionString' not found.")));

// Explicitly load environment variables from .env file in development
if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddEnvironmentVariables();
}
builder.WebHost.UseUrls("http://0.0.0.0:80");
var app = builder.Build();

// Tự động apply migration khi khởi động
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<DevopsFinalContext>();
    dbContext.Database.Migrate();
}
// Configure the HTTP request pipeline.

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Users}/{action=Index}/{id?}");

app.Run();

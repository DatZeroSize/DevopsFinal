using DevopsFinal.Data;
using DotNetEnv;
using Microsoft.EntityFrameworkCore;

// Check file permissions and content
if (!File.Exists("/app/.env"))
{
    throw new FileNotFoundException("The .env file was not found at /app/.env");
}

// Load .env file
Env.Load("/app/.env");

// Log after loading .env

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.Sources.Clear();
builder.Configuration.AddEnvironmentVariables();

var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnectionString");

if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("Database connection string is missing.");
}

builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<DevopsFinalContext>(options =>
    options.UseSqlServer(connectionString));

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

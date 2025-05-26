using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using DevopsFinal.Models;

namespace DevopsFinal.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController>? _logger; // Cho phép null

    public HomeController(ILogger<HomeController>? logger = null) // Thêm giá trị mặc định là null
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
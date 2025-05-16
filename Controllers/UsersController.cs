using Microsoft.AspNetCore.Mvc;
using DevopsFinal.Data;
using DevopsFinal.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DevopsFinal.Controllers
{
    public class UsersController : Controller
    {
        private readonly DevopsFinalContext _context;

        public UsersController(DevopsFinalContext context)
        {
            _context = context;
        }

        // Hiển thị danh sách Users (Index)
        public async Task<IActionResult> Index()
        {
            var users = await _context.Users.ToListAsync();
            return View(users);
        }

        // GET: Users/Create - Hiển thị form thêm User
        public IActionResult Create()
        {
            return View();
        }

        // POST: Users/Create - Xử lý thêm User
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(User user)
        {
            if (ModelState.IsValid)
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(user);
        }

        // GET: Users/Delete/5 - Hiển thị xác nhận xóa
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null) return NotFound();

            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            return View(user);
        }

        // POST: Users/Delete - Xử lý xóa
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }
    }
}

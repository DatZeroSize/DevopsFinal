using Xunit;
using DevopsFinal.Controllers;
using DevopsFinal.Data;
using DevopsFinal.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
//sjakldljkasjdklajskldajslk
namespace Test
{
    public class UnitTest1
    {
        [Fact]
        public void Create_Get_ReturnsViewResult()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var controller = new UsersController(context);

            // Act
            var result = controller.Create();

            // Assert
            Assert.IsType<ViewResult>(result);
        }
        private DevopsFinalContext GetInMemoryDbContext()
        {
            var options = new DbContextOptionsBuilder<DevopsFinalContext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;

            var context = new DevopsFinalContext(options);

            // Seed data mẫu
            context.Users.Add(new User { Id = 1, Name = "Tài", Email = "tai@example.com" });
            context.Users.Add(new User { Id = 2, Name = "An", Email = "an@example.com" });
            context.SaveChanges();

            return context;
        }

        [Fact]
        public async Task Index_ReturnsAViewResult_WithAListOfUsers()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var controller = new UsersController(context);

            // Act
            var result = await controller.Index();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsAssignableFrom<List<User>>(viewResult.Model);
            Assert.Equal(2, model.Count);
        }

        [Fact]
        public async Task Create_ValidUser_RedirectsToIndex()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<DevopsFinalContext>()
                .UseInMemoryDatabase(databaseName: "CreateTestDb")
                .Options;

            using var context = new DevopsFinalContext(options);
            var controller = new UsersController(context);
            var newUser = new User { Name = "Minh", Email = "minh@example.com" };

            // Act
            var result = await controller.Create(newUser);

            // Assert
            var redirectToActionResult = Assert.IsType<RedirectToActionResult>(result);
            Assert.Equal("Index", redirectToActionResult.ActionName);

            // Kiểm tra user đã được thêm vào DB
            Assert.Single(context.Users, u => u.Name == "Minh");
        }
        [Fact]
        public async Task Create_InvalidUser_ReturnsViewResult()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var controller = new UsersController(context);
            var invalidUser = new User { Name = "", Email = "invalid-email" }; // Email không hợp lệ, Name rỗng
            controller.ModelState.AddModelError("Name", "The Name field is required.");
            controller.ModelState.AddModelError("Email", "The Email field is not a valid email address.");

            // Act
            var result = await controller.Create(invalidUser);

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsType<User>(viewResult.Model);
            Assert.Equal(invalidUser, model);
            Assert.Empty(context.Users.Where(u => u.Email == "invalid-email")); // Đảm bảo user không được thêm
        }
[Fact]
public async Task Delete_ValidId_ReturnsViewWithUser()
{
    // Arrange
    var context = GetInMemoryDbContext();
    var controller = new UsersController(context);

    // Act
    var result = await controller.Delete(1);

    // Assert
    var viewResult = Assert.IsType<ViewResult>(result);
    var model = Assert.IsType<User>(viewResult.Model);
    Assert.Equal(1, model.Id);
    Assert.Equal("Tài", model.Name);
    Assert.Equal("tai@example.com", model.Email);
}
[Fact]
public async Task DeleteConfirmed_ValidId_RedirectsToIndex()
{
    // Arrange
    var context = GetInMemoryDbContext();
    var controller = new UsersController(context);

    // Act
    var result = await controller.DeleteConfirmed(1);

    // Assert
    var redirectResult = Assert.IsType<RedirectToActionResult>(result);
    Assert.Equal("Index", redirectResult.ActionName);
    Assert.Null(context.Users.Find(1)); // Đảm bảo user đã bị xóa
}
    }
    
}

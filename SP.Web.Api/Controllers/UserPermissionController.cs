using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sp.Models;
using SP.Common;
using SP.Models;
using SP.Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SP.Web.Api.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserPermissionController : Controller
    {
        private readonly IUserPermissionService _userPermissionService;
        private readonly ICommandProcessor _processor;
        public UserPermissionController(IUserPermissionService userPermissionService, ICommandProcessor processor)
        {
            _userPermissionService = userPermissionService;
            _processor = processor;
        }

        [HttpPost]
        [Route("AddUserPermission")]
        public IActionResult AddUserPermission([FromBody] UserPermission userPermission)
        {
            var result = _userPermissionService.AddUserPermission(userPermission);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpPost]
        [Route("AddUserPermissions")]
        public IActionResult AddUserPermissions([FromBody] IList<UserPermission> userPermission)
        {
            var result = _userPermissionService.AddUserPermission(userPermission);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpPost]
        [Route("UpdateUserPermissions")]
        public IActionResult UpdateUserPermissions([FromBody] IList<UserPermission> userPermission)
        {
            var result = _userPermissionService.UpdateUserPermissions(userPermission);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetUserPermission/{userId}")]
        public IActionResult GetUserPermission([FromRoute] string userId)
        {
            var result = _userPermissionService.GetUserPermission(userId);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetUserPermissionsByStaffId/{userId}")]
        public IActionResult GetUserPermissionsByStaffId([FromRoute] string userId)
        {
            var result = _userPermissionService.GetUserPermissionsByStaffId(userId);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetUserPermissions/{userId}")]
        public IActionResult GetUserPermissions([FromRoute] string userId)
        {
            var result = _userPermissionService.GetUserPermissions(userId);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("DeleteUserPermission/{userId}")]
        public IActionResult DeleteUserPermission([FromRoute] string userId)
        {
            var result = _userPermissionService.DeleteUserPermission(userId);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetUsers")]
        public async Task<IActionResult> GetUsers()
        {
            var result = await $"https://auth.uenr.edu.gh/api/User/GetUsers".Get<List<User>>();
            return Ok(result);
        }
    }
    public record class User(string Email,string UserId,string UserName,string Id,string UserType);
}

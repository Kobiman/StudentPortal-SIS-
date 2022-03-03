using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sp.Models;
using SP.Services.Interfaces;
using System.Collections.Generic;

namespace SP.Web.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PageController : Controller
    {
        private readonly IPageService _pageService;
        public PageController(IPageService pageService)
        {
            _pageService = pageService;
        }


        [HttpPost]
        [Route("AddPage")]
        public IActionResult AddUserPermission([FromBody] Page page)
        {
            var result = _pageService.AddPage(page);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }


        [HttpPost]
        [Route("AddPages")]
        public IActionResult AddPages([FromBody] IList<Page> page)
        {
            var result = _pageService.AddPages(page);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetPage/{pageId}")]
        public IActionResult GetPageById([FromRoute] string pageId)
        {
            var result = _pageService.GetPageById(pageId);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetPages")]
        public IActionResult GetPages()
        {
            var result = _pageService.GetPages();
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("DeletePage/{pageId}")]
        public IActionResult DeletePage([FromRoute] string pageId)
        {
            var result = _pageService.DeletePage(pageId);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }
    }
}

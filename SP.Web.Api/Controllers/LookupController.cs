using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SP.Models;
using SP.Services.Interfaces;

namespace SP.Web.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class LookupController : ControllerBase
    {
        private readonly ILookupService _lookupService;
        public LookupController(ILookupService lookupService)
        {
            _lookupService = lookupService;
        }

        [HttpPost]
        [Route("AddLookup")]
        public IActionResult AddLookup([FromBody]Lookup lookup)
        {
            var result = _lookupService.AddLookup(lookup);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetLookups")]
        public IActionResult GetLookups()
        {
            var result = _lookupService.GetLookups();
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }
    }
}
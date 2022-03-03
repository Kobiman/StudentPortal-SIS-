using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces;

namespace SP.Web.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class InstitutionController : ControllerBase
    {
        private readonly IInstitutionService _institutionService;
        public InstitutionController(IInstitutionService institutionService)
        {
            _institutionService = institutionService;
        }

        [HttpPost]
        [Route("AddInstitution")]
        public IActionResult AddInstitution([FromBody]Institution institution)
        {
            var result = _institutionService.AddInstitution(institution);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetInstitutions")]
        public IActionResult GetInstitutions()
        {
            var result = _institutionService.GetInstitutions();
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpPost]
        [Route("UpdateInstitution")]
        public IActionResult UpdateInstitution([FromBody] UpdateInstitutionRequest institution)
        {
            var result = _institutionService.UpdateInstitution(institution);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }
    }
}
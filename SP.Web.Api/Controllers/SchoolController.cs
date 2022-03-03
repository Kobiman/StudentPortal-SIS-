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
    public class SchoolController : ControllerBase
    {
        private readonly ISchoolService _schoolService;
        private readonly ICommandProcessor _processor;
        public SchoolController(ICommandProcessor processor, ISchoolService schoolService)
        {
            _schoolService = schoolService;
            _processor = processor;
        }

        [HttpPost]
        [Route("AddSchool")]
        public IActionResult AddSchool([FromBody] School school)
        {
            var result = _schoolService.AddSchool(school);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetSchools")]
        public IActionResult GetSchools()
        {
            var result = _schoolService.GetSchools();
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetSchoolByProgram/{program}")]
        public IActionResult GetSchoolByProgram(string program)
        {
            var result = _processor.Execute(new GetSchoolByProgramRequest(program));
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }



        [HttpPost]
        [Route("UpdateSchool")]
        public IActionResult UpdateSchool([FromBody] UpdateSchoolRequest school)
        {
            var result = _schoolService.UpdateSchool(school);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }
    }
}
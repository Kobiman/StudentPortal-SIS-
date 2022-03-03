using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sp.Models.Dtos.Request;
using SP.Commands;
using SP.Models.Dtos;
using SP.Models.Dtos.Request;
using SP.Services.Interfaces;

namespace SP.Web.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _studentService;
        private readonly ICommandProcessor _processor;
        public StudentController(IStudentService studentService, ICommandProcessor processor)
        {
            _studentService = studentService;
            _processor = processor;
        }


        [HttpPost]
        [Route("AddStudent")]
        public IActionResult AddStudent([FromBody]AddStudentRequest request)
        {
            var result = _studentService.AddStudent(request);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpPost]
        [Route("UpdateStudent")]
        public IActionResult UpdateStudent([FromBody] UpdateStudentRequest request)
        {
            var result = _studentService.UpdateStudent(request);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("UpdateSpecialization/{indexNumber}/{specializationId}")]
        public IActionResult UpdateSpecialization([FromRoute] string indexNumber, [FromRoute] string specializationId)
        {
            var result = _studentService.UpdateSpecialization(indexNumber, specializationId);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetStudents")]
        public IActionResult GetStudents()
        {
            var result = _studentService.GetStudents();
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetStudent/{indexNumber}")]
        public IActionResult GetStudents(string indexNumber)
        {
            var result = _studentService.GetStudent(indexNumber);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("CheckResults/{indexNumber}")]
        public IActionResult CheckResults(string indexNumber)
        {
            var result = _processor.Execute(new CheckResultRequest(indexNumber));
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetStudentsEnteryLevel")]
        public IActionResult GetStudentsEnteryLevel()
        {
            var result = _processor.Execute(new GetStudentsEnteryLevelRequest());
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("CanRegisterStudent")]
        public async Task<IActionResult> CanRegister([FromQuery] string indexNumber, [FromQuery] string academicYear)
        {
            var result = await _processor.ExecuteAsync(new CanRegisterStudentRequest(indexNumber, academicYear));
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetFeeStatement/{indexNumber}")]
        public async Task<IActionResult> GetFeeStatement([FromRoute] string indexNumber)
        {
            var result = await _processor.ExecuteAsync(new GetFeeStatementRequest(indexNumber));
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }
    }
}
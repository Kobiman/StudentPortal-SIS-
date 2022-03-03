using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sp.Models.Dtos.Request;
using SP.Models.Dtos;
using SP.Services.Interfaces;

namespace SP.Web.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICommandProcessor _processor;
        private readonly ICourseService _courseService;
        public CourseController(ICourseService courseService, ICommandProcessor processor)
        {
            _courseService = courseService;
            _processor = processor;
        }

        [HttpPost]
        [Route("AddCourse")]
        public IActionResult AddCourse([FromBody]AddCourseRequest course)
        {
            var result = _courseService.AddCourse(course);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetCourses")]
        public IActionResult GetCourses()
        {
            var result = _courseService.GetCourses();
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }


        [HttpPost]
        [Route("UpdateCourse")]
        public IActionResult UpdateCourse([FromBody] UpdateCourseRequest course)
        {
            var result = _courseService.UpdateCourse(course);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetAttendanceList")]
        public IActionResult GetAttendanceList([FromQuery]string academicYear, [FromQuery]string semester)
        {
            var result = _processor.Execute(new GetAttendanceListForExamsRequest(academicYear, semester));
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }
    }
}
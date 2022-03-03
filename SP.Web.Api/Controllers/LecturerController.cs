using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sp.Models.Dtos.Request;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces;

namespace SP.Web.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class LecturerController : ControllerBase
    {
        private readonly ILecturerService _lecturerService;
        private readonly ICommandProcessor _processor;
        public LecturerController(ILecturerService lecturerService, ICommandProcessor processor)
        {
            _lecturerService = lecturerService;
            _processor = processor;
        }

        [HttpPost]
        [Route("AddLecturer")]
        public IActionResult AddLecturer([FromBody]Lecturer lecturer)
        {
            var result = _lecturerService.AddLecturer(lecturer);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetLecturers")]
        public IActionResult GetLecturers()
        {
            var result = _lecturerService.GetLecturers();
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetLecturer/{lecturerId}")]
        public IActionResult GetLecturers(string lecturerId)
        {
            var result = _lecturerService.GetLecturer(lecturerId);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetLecturerByStaffId/{staffId}")]
        public IActionResult GetLecturerByStaffId(string staffId)
        {
            var result = _lecturerService.GetLecturerByStaffId(staffId);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }


        [HttpPost]
        [Route("UploadResults")]
        public IActionResult UploadResults([FromBody] ExamResult[] request)
        {
            var result = _processor.Execute(new AddExamResultsRequest(request));
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpPost]
        [Route("UpdateLecturer")]
        public IActionResult UpdateLecturer([FromBody] UpdateLecturerRequest lecturer)
        {
            var result = _lecturerService.UpdateLecturer(lecturer);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

    }
}
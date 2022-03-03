using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sp.Models.Dtos.Request;
using SP.Commands;
using SP.Common;
using SP.Models;
using SP.Models.Dtos;
using SP.Models.Dtos.Request;
using SP.Services.Interfaces;
using SP.Services.Interfaces.Commands;
using SP.Web.Api.Channels;

namespace SP.Web.Api.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
       private readonly ICommandProcessor _processor;
        private readonly IMountCourseChannel _mountCourseChannel;
        private readonly IDepartmentService _departmentService;
        public DepartmentController(ICommandProcessor processor, IDepartmentService departmentService, IMountCourseChannel mountCourseChannel)
        {
            _processor = processor;
            _mountCourseChannel = mountCourseChannel;
            _departmentService = departmentService;
        }

        [HttpPost]
        [Route("AddDepartment")]
        public IActionResult AddDepartment([FromBody]AddDepartmentRequest department)
        {
            var result = _departmentService.AddDepartment(department);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetDepartments")]
        public IActionResult GetDepartments()
        {
            var result = _departmentService.GetDepartments();
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetDepartment/{departmentId}")]
        public IActionResult GetDepartment([FromRoute]string departmentId)
        {
            var result = _departmentService.GetDepartment(departmentId);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpPost]
        [Route("MountCourse")]
        public async Task<IActionResult> MountCourse([FromBody]IEnumerable<MountedCourseDto> mountedCourses)
        {
            var result = await _mountCourseChannel.WriteAsync(new AddMountedCourseRequest(mountedCourses));
            return Ok(result);
        }
        
        [HttpPost]
        [Route("AssignCourse")]
        public async Task<IActionResult> AssignCourse([FromBody] AssignMountedCourseRequest assignCourseRequest)
        {
            var result = await _mountCourseChannel.WriteAsync(assignCourseRequest);
            return Ok(result);
        }

        [HttpGet]
        [Route("DeleteMountedCourse/{programId}/{mountedCourseId}")]
        public async Task<IActionResult> DeleteMountedCourse([FromRoute] string programId, [FromRoute] string mountedCourseId)
        {
            var result = await _mountCourseChannel.WriteAsync(new DeleteMountedCourseRequest(programId, mountedCourseId));
            return Ok(result);
        }

        [HttpPost]
        [Route("GetMountedCourses")]
        public IActionResult MountedCourses([FromBody]IList<Query> request)
        {
            var result = _processor.Execute(new GetMountedCoursesRequest(request));
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetDepartmentsWithCourses")]
        public IActionResult GetDepartmentsWithCourses()
        {
            var result = _processor.Execute(new GetDepartmentsWithCoursesRequest());
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpPost]
        [Route("GetMountedCoursesForRegistration")]
        public IActionResult GetMountedCoursesForRegistration(GetMountedCoursesForRegistrationRequest request)
        {
            var result = _processor.Execute(request);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpPost]
        [Route("GetTrailList")]
        public IActionResult GetTrailList(GetTrailListRequest request)
        {
            var result = _processor.Execute(request);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpPost]
        [Route("GetMountedCoursesForResultsUpload")]
        public IActionResult GetMountedCoursesForResultsUpload(GetMountedCoursesForResultsUploadRequest request)
        {
            var result = _processor.Execute(request);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpPost]
        [Route("RegisterCourse")]
        public IActionResult RegisterCourse([FromBody]IEnumerable<RegisteredCourseDto> request)
        {
            var result = _processor.Execute(new AddRegisteredCoursesRequest(request));
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpPost]
        [Route("UpdateRegisterCourse")]
        public async Task<IActionResult> UpdateRegisterCourse([FromBody] IEnumerable<RegisteredCourseDto> request)
        {
            var result = await _mountCourseChannel.WriteAsync(new UpdateRegisteredCoursesRequest(request));
            return Ok(result);
        }

        [HttpPost]
        [Route("GetRegisteredCourses")]
        public IActionResult GetRegisteredCourses([FromBody] GetRegisteredCoursesRequest request)
        {
            var result = _processor.Execute(request);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpPost]
        [Route("GetRegisteredCoursesForApproval")]
        public IActionResult GetRegisteredCourses([FromBody] GetRegisteredCoursesForApprovalRequest request)
        {
            var result = _processor.Execute(request);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpPost]
        [Route("ApproveRegisteredCourses")]
        public IActionResult GetRegisteredCourses([FromBody] ApproveRegisteredCourseDto[] request)
        {
            var result = _processor.Execute(new ApproveRegisteredCoursesRequest(request));
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpPost]
        [Route("GetExamResults")]
        public IActionResult GetExamResults([FromBody] GetExamResultsRequest request)
        {
            var result = _processor.Execute(request);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpPost]
        [Route("UpdateDepartment")]
        public IActionResult UpdateDepartment([FromBody] UpdateDepartmentRequest request)
        {
            var result = _departmentService.UpdateDepartment(request);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpPost]
        [Route("GetRegisteredStudentsList")]
        public IActionResult GetRegisteredStudentsList([FromBody] GetRegisteredStudentsRequest request)
        {
            var result = _processor.Execute(request);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpPost]
        [Route("ApproveResults")]
        public async Task<IActionResult> ApproveResults([FromBody] IEnumerable<ApproveResultsDto> request)
        {
            var result = await _mountCourseChannel.WriteAsync(new ApproveResultsRequest(request));
            return Ok(result);
        }
    }
}
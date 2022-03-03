using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sp.Models;
using SP.Services.Interfaces;
using System.Collections.Generic;

namespace SP.Web.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusControlController : ControllerBase
    {
        private readonly IStatusControlService _statusControlService;
        public StatusControlController(IStatusControlService statusControlService)
        {
            _statusControlService = statusControlService;
        }

        [HttpPost("AddStatusControl")]
        public IActionResult AddStatusControl(StatusControl statusControl)
        {
            var result = _statusControlService.AddStatusControl(statusControl);
            if(result.IsSucessful) return Ok(result);
            return BadRequest();
        }

        [HttpPost("AddStatusControls")]
        public IActionResult AddStatusControls(IList<StatusControl> statusControls)
        {
            var result = _statusControlService.AddStatusControls(statusControls);
            if (result.IsSucessful) return Ok(result);
            return BadRequest();
        }

        [HttpPost("UpdateStatusControl")]
        public IActionResult UpdateStatusControl(StatusControl statusControl)
        {
            var result = _statusControlService.UpdateStatusControl(statusControl);
            if (result.IsSucessful) return Ok(result);
            return BadRequest();
        }

        [HttpPost("UpdateStatusControls")]
        public IActionResult UpdateStatusControls(IList<StatusControl> statusControls)
        {
            var result = _statusControlService.UpdateStatusControls(statusControls);
            if (result.IsSucessful) return Ok(result);
            return BadRequest();
        }

        [HttpGet("GetStatusControl")]
        public IActionResult GetStatusControls([FromQuery] string academicYear, [FromQuery]string programId)
        {
            var result = _statusControlService.GetStatusControl(academicYear, programId);
            if (result.IsSucessful) return Ok(result);
            return NotFound();
        }

        [HttpGet("GetStatusControls")]
        public IActionResult GetStatusControls([FromQuery]string academicYear)
        {
            var result = _statusControlService.GetStatusControls(academicYear);
            if (result.IsSucessful) return Ok(result);
            return NotFound();
        }
    }
}

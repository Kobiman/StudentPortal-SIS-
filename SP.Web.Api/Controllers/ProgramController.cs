using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SP.Models.Dtos;
using SP.Services.Interfaces;

namespace SP.Web.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProgramController : ControllerBase
    {
        private readonly IProgramService _programService;
        public ProgramController(IProgramService programService)
        {
            _programService = programService;
        }

        [HttpPost]
        [Route("AddProgram")]
        public IActionResult AddProgram([FromBody]AddProgramRequest program)
        {
            var result = _programService.AddProgram(program);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpPost]
        [Route("UpdateProgram")]
        public IActionResult UpdateProgram([FromBody] UpdateProgramRequest program)
        {
            var result = _programService.UpdateProgram(program);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetPrograms")]
        public IActionResult GetPrograms()
        {
            var result = _programService.GetPrograms();
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetProgram/{programId}")]
        public IActionResult GetProgram([FromRoute]string programId)
        {
            var result = _programService.GetProgram(programId);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

    }
}
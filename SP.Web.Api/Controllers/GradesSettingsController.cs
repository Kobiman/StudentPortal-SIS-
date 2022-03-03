using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sp.Models.Dtos.Request;
using SP.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SP.Web.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GradesSettingsController : ControllerBase
    {
        private readonly IGradesSettingsService _gradesSettingsService;
        public GradesSettingsController(IGradesSettingsService gradesSettingsService)
        {
            _gradesSettingsService = gradesSettingsService;
        }


        [HttpPost]
        [Route("AddGradesSettings")]
        public IActionResult AddGradesSettings([FromBody] AddGradeSettingRequest gradesSettings)
        {
            var result = _gradesSettingsService.AddGradesSettings(gradesSettings);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetGradesSettings")]
        public IActionResult GetGradesSettings()
        {
            var result = _gradesSettingsService.GetGradeSetting();
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetGradesSettingsById/{gradesSettingsId}")]
        public IActionResult GetGradesSettingsById([FromRoute] string gradesSettingsId)
        {
            var result = _gradesSettingsService.GetGradeSettingById(gradesSettingsId);
            if (result.IsSucessful) return Ok(result);
            return BadRequest(result);
        }

    }
}

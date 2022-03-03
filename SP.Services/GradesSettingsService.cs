using KMapper;
using Sp.Models;
using Sp.Models.Dtos.Request;
using Sp.Models.Dtos.Response;
using SP.Common;
using SP.Models;
using SP.Services.Interfaces;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SP.Services
{
   public class GradesSettingsService: IGradesSettingsService
    {
        private readonly IUnitOfWork _uow;
        public GradesSettingsService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public IResult AddGradesSettings(AddGradeSettingRequest request)
        {

            ICollection<ValidationResult> results = new List<ValidationResult>();
            if (!request.Validate(out results)) return new Result(false, results.First().ErrorMessage);
            _uow.GradesSettings.AddGradesSettings(request);
            return new Result(true, "Grade Settings Added Successfully");
        }

        public IResult Delete(string gradesSettingsId)
        {
            throw new NotImplementedException();
        }

        public IResult GetGradeSettingById(string gradesSettingsId)
        {
            if (string.IsNullOrWhiteSpace(gradesSettingsId)) return new Result(false, "GradesSettingsId cannot be null");
            var program = _uow.Programs.GetProgram(gradesSettingsId);
            if (program == null) return new Result(false, "ProgramId was not found");
            return new Result<GetGradeSettingsResponse>(true, program.Map<GetGradeSettingsResponse, Program>(), "");
        }

        public IResult GetGradeSetting()
        {
            return new Result<IEnumerable<GradesSettings>>(true,
                _uow.GradesSettings.GetGradesSettings(), "");
        }

        public IResult GetGradeSettingByCommissionDate(DateTime commissiondate)
        {
          //  if (DateTime.(commissiondate)) return new Result(false, "Grade Settings commission date cannot be null");
            var gradesSettings = _uow.GradesSettings.GetGradesSettings().FirstOrDefault(x => x.CommissionDate== commissiondate);
            if (gradesSettings == null) return new Result(false, "Commission Date was not found");
            return new Result<GradesSettings>(true, gradesSettings, "");
        }

        public IResult UpdateGradesSettings(UpdateGradeSettingRequest request)
        {
            ICollection<ValidationResult> results = new List<ValidationResult>();
            if (!request.Validate(out results)) return new Result(false, results.First().ErrorMessage);
            if (!_uow.GradesSettings.UpdateGradesSettings(request)) return new Result(false, "Could Not Update GradeSettings");
            return new Result(true, "Grade Settings Updated Successfully");
        }
    }
}

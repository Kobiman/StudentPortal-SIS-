using Sp.Models.Dtos.Request;
using SP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SP.Services.Interfaces
{
   public interface IGradesSettingsService
    {
        IResult AddGradesSettings(AddGradeSettingRequest request);
        IResult GetGradeSettingById(string gradesSettingsId);
        IResult GetGradeSetting();
        IResult UpdateGradesSettings(UpdateGradeSettingRequest request);
        IResult GetGradeSettingByCommissionDate(DateTime commissionDate);
    }
}

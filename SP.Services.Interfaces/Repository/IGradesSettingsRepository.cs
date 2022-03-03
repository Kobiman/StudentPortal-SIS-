using Sp.Models;
using Sp.Models.Dtos.Request;
using SP.Models;
using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Services.Interfaces.Repository
{
    public interface IGradesSettingsRepository
    {
        bool AddGradesSettings(AddGradeSettingRequest request);
        GradesSettings GetGradesSettings(string gradesSettingsId);
        IEnumerable<GradesSettings> GetGradesSettings();
        bool UpdateGradesSettings(UpdateGradeSettingRequest request);
        GradesSettings GetGradesSettingsByCommissionDate(DateTime commissiondate);
        bool Delete(string gradesSettingsId);
    }
}

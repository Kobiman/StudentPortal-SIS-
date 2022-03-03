using KMapper;
using Sp.Models;
using Sp.Models.Dtos.Request;
using SP.DAL.Models;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SP.DAL.Repository
{
    public class GradesSettingsRepository : IGradesSettingsRepository
    {
        private GradesSettingsDM Collection;
        public GradesSettingsRepository(GradesSettingsDM collection)
        {
            Collection = collection;
        }
        public bool AddGradesSettings(AddGradeSettingRequest request)
        {

            var gradesSettings = request.Map<GradesSettings, AddGradeSettingRequest>();
            gradesSettings.State = gradesSettings.State++;
            Collection.Add(gradesSettings);

            DataWriter.Add(gradesSettings, nameof(GradesSettings));
            
            return true; 
        }

        public bool Delete(string gradesSettingsId)
        {
            return true;
        }

        public GradesSettings GetGradesSettings(string gradesSettingsId)
        {
            var gradesSettings = Collection.Find((x, y) => x.GradesSettingsId[y] == gradesSettingsId);
            return CreateGradesSettings(gradesSettings);
        }

        public IEnumerable<GradesSettings> GetGradesSettings() => Collection.Select((x, y) => CreateGradesSettings(x, y));

        public GradesSettings GetGradesSettingsByCommissionDate(DateTime commissiondate)
        {
            var gradesSetting = Collection.Find((x, y) => x.CommissionDate[y] == commissiondate);
            return CreateGradesSettings(gradesSetting);
        }

        public bool UpdateGradesSettings(UpdateGradeSettingRequest request)
        {
            var result = Collection.Find((x, y) => x.GradesSettingsId[y] == request.GradesSettingsId);
            var originalGradesSettings = CreateGradesSettings(result);
            if (originalGradesSettings == null) return false;
            request.Map(originalGradesSettings);

            DataWriter.Add(originalGradesSettings, nameof(Program));
            return true;
        }


        private static GradesSettings CreateGradesSettings(GradesSettingsDM Value, int Index)
        {
            return new GradesSettings
            {
                GradesSettingsId = Value.GradesSettingsId[Index],
                Grade = Value.Grade[Index],
                GradePoint = Value.GradePoint[Index],
                UpperLimit = Value.UpperLimit[Index],
                LowerLimit = Value.LowerLimit[Index],
                GradeRemarks = Value.GradeRemarks[Index],
                CommissionDate = Value.CommissionDate[Index],
                Type = Value.Type[Index]
            };
        }

        private GradesSettings CreateGradesSettings((GradesSettingsDM Value, int Index, bool Success) result)
        {
            if (!result.Success) return null;
            return CreateGradesSettings(result.Value, result.Index);
        }
    }
}

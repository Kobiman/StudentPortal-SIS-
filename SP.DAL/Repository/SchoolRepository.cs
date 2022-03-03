using KMapper;
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
    public class SchoolRepository : ISchoolRepository
    {
        private SchoolDM Collection;
        public SchoolRepository(SchoolDM collection)
        {
            Collection = collection;
        }
        public bool AddSchool(School school)
        {
            Collection.Add(school);
            DataWriter.Add(school, nameof(School));
            return true;
        }
        public School GetSchool(string schoolId)
        {
            var result = Collection.Find((x,y) => x.SchoolId[y] == schoolId);
            return CreateSchool(result);
        }

        public IEnumerable<School> GetSchools() => Collection.Select((x,y)=> CreateSchool(x,y));
        public bool UpdateSchool(UpdateSchoolRequest school)
        {
            var sch = Collection.Find((x, y) => x.SchoolId[y] == school.SchoolId);
            if (!sch.success) return false;

            sch.Value.Name[sch.Index] = school.Name;
            sch.Value.AcademicYear[sch.Index] = school.AcademicYear;
            sch.Value.LecturerId[sch.Index] = school.LecturerId;
            sch.Value.RegistrationActivated[sch.Index] = school.RegistrationActivated;
            sch.Value.ResultUploaded[sch.Index] = school.ResultUploaded;
            sch.Value.State[sch.Index] ++;
            
            DataWriter.Add(CreateSchool(sch.Value, sch.Index), nameof(School));

            return true;
        }

        private School CreateSchool(SchoolDM Value, int Index)
        {
            return new School
            {
                AcademicYear = Value.AcademicYear[Index],
                InstitutionId = Value.InstitutionId[Index],
                Name = Value.Name[Index],
                RegistrationActivated = Value.RegistrationActivated[Index],
                ResultUploaded = Value.ResultUploaded[Index],
                Semester = Value.Semester[Index],
                SchoolId = Value.SchoolId[Index],
                LecturerId = Value.LecturerId[Index],
                State = Value.State[Index]
            };
        }

        private School CreateSchool((SchoolDM Value, int Index, bool success) result)
        {
            if (!result.success) return null;
            return CreateSchool(result.Value, result.Index);
        }
    }
}

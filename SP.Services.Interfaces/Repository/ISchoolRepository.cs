using SP.Models;
using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Services.Interfaces.Repository
{
    public interface ISchoolRepository
    {
        bool AddSchool(School school);
        School GetSchool(string schoolId);
        IEnumerable<School> GetSchools();
        bool UpdateSchool(UpdateSchoolRequest school);
    }
}

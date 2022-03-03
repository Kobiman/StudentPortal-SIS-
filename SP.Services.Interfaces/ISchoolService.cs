using SP.Models;
using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Services.Interfaces
{
    public interface ISchoolService
    {
        IResult AddSchool(School school);
        IResult GetSchool(string schoolId);
        IResult GetSchools();
        IResult UpdateSchool(UpdateSchoolRequest school);
    }
}

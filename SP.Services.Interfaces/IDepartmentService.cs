using SP.Models;
using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Services.Interfaces
{
    public interface IDepartmentService
    {
        IResult AddDepartment(AddDepartmentRequest request);
        IResult GetDepartment(string departmentId);
        IResult GetDepartmentByName(string name);
        IResult GetDepartments();
        IResult UpdateDepartment(UpdateDepartmentRequest request);
    }
}

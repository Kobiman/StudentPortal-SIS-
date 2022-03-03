using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Services.Interfaces
{
    public interface IDepartmentRepository
    {
        bool AddDepartment(AddDepartmentRequest request);
        Department GetDepartment(string departmentId);
        IEnumerable<Department> GetDepartments();
        bool UpdateDepartment(UpdateDepartmentRequest request);
        Department GetDepartmentbyName(string name);
    }
}

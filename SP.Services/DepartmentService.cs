using KMapper;
using SP.Common;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace SP.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IUnitOfWork _uow;
        public DepartmentService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public IResult AddDepartment(AddDepartmentRequest request)
        {
            ICollection<ValidationResult> results = new List<ValidationResult>();
            if (!request.Validate(out results)) return new Result(false, results.First().ErrorMessage);
            _uow.Departments.AddDepartment(request);
            return new Result(true, "Student Added Successfully");
        }

        public IResult GetDepartment(string departmentId)
        {
            if (string.IsNullOrWhiteSpace(departmentId)) return new Result(false, "DepartmentId cannot be null");
            var department = _uow.Departments.GetDepartment(departmentId);
            if (department == null) return new Result(false, "DepartmentId was not found");
            return new Result<GetDepartmentResponse>(true, department.Map<GetDepartmentResponse, Department>(), "");
        }

        public IResult GetDepartmentByName(string name)
        {
            if (string.IsNullOrWhiteSpace(name)) return new Result(false, "Department name cannot be null");
            var department = _uow.Departments.GetDepartmentbyName(name);
            if (department == null) return new Result(false, "Department name was not found");
            return new Result<GetDepartmentResponse>(true, department.Map<GetDepartmentResponse, Department>(), "");
        }

        public IResult GetDepartments()
        {
            return new Result<IEnumerable<GetDepartmentsResponse>>(true,
                _uow.Departments.GetDepartments().Select(x => x.Map<GetDepartmentsResponse, Department>()).ToList(), "");
        }

        public IResult UpdateDepartment(UpdateDepartmentRequest request)
        {
            if (!_uow.Departments.UpdateDepartment(request)) return new Result(false, "Could Not Update Department");
            _uow.SaveChanges();
            return new Result(true, "Department Updated Successfully");
        }
    }
}

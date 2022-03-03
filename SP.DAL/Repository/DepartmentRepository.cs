using KMapper;
using SP.DAL.Models;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SP.DAL.Repository
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private DepartmentDM Collection;
        public DepartmentRepository(DepartmentDM collection)
        {
            Collection = collection;
        }

        public bool AddDepartment(AddDepartmentRequest request)
        {
            var department = request.Map<Department, AddDepartmentRequest>();
            DataWriter.Add(department, nameof(Department));
            return true;
            Collection.Add(department);
        }

        public Department GetDepartment(string departmentId)
        {
            var result = Collection.Find((x, y) => x.DepartmentId[y] == departmentId);
            return CreateDepartment(result);
        }

        public Department GetDepartmentbyName(string name)
        {
            var result = Collection.Find((x, y) => x.Name[y] == name);
            return CreateDepartment(result);
        }

        public IEnumerable<Department> GetDepartments() => Collection.Select((x, y) => CreateDepartment(x, y));

        public bool UpdateDepartment(UpdateDepartmentRequest request)
        {
            var result = Collection.Find((x, y) => x.DepartmentId[y] == request.DepartmentId);
            if(!result.success) return true;
            result.Value.Code[result.Index] = request.Code;
            result.Value.Name[result.Index]=request.Name;
            result.Value.SchoolId[result.Index]=request.SchoolId;
            result.Value.LecturerId[result.Index]=request.LecturerId;
            result.Value.State[result.Index] += 1;
            var originalDepartment = CreateDepartment(result);
            request.Map(originalDepartment);
            DataWriter.Add(originalDepartment, nameof(Department));
            return true;
        }

        private Department CreateDepartment(DepartmentDM Value, int Index)
        {
            return new Department
            {
                Code = Value.Code[Index],
                SchoolId = Value.SchoolId[Index],
                Name = Value.Name[Index],
                DepartmentId = Value.DepartmentId[Index],
                CourseMounting = Value.CourseMounting[Index],
                LecturerId=Value.LecturerId[Index],
                State= Value.State[Index]
            };
        }

        private Department CreateDepartment((DepartmentDM Value, int Index, bool Success) result)
        {
            if (!result.Success) return null;
            return CreateDepartment(result.Value, result.Index);
        }
    }
}

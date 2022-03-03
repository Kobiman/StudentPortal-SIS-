using SP.Common;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces.Commands;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SP.Commands
{
    public class GetDepartmentsWithCoursesCommand : IGetDepartmentsWithCoursesCommand
    {
        private readonly IUnitOfWork _uow;
        public GetDepartmentsWithCoursesCommand(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public IResult Execute(IRequest request)
        {
            if (request is GetDepartmentsWithCoursesRequest)
            {
                var departments = _uow.Departments.GetDepartments();
                var corses = _uow.Courses.GetCourses();

                var departmentsWithCourses = (from d in departments
                                              let school = _uow.Schools.GetSchool(d.SchoolId)
                                              select new GetDepartmentsWithCoursesResponse
                                              {
                                                  DepartmentId = d.DepartmentId,
                                                  Code = d.Code,
                                                  Name = d.Name,
                                                  SchoolId = school?.SchoolId,
                                                  SchoolName = school?.Name,
                                                  AcademicYear = school?.AcademicYear,
                                                  Semester = school?.Semester,
                                                  Courses = corses.Where(x => x.DepartmentId == d.DepartmentId).ToList()
                                              }).ToList();

                if (departmentsWithCourses == null) return new Result(false, Message.OperationFailed);

                return new Result<IEnumerable<GetDepartmentsWithCoursesResponse>>(
                           true,
                           departmentsWithCourses, 
                           Message.FetchOperationCompletedSuccesfully);
            }
            return new Result(false, ""); 
        }
    }
}

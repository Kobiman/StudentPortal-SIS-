using SP.Common;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces.Commands;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using KMapper;

namespace SP.Commands
{
    public class AddRegisteredCoursesCommand : IAddRegisteredCoursesCommand
    {
        private readonly IUnitOfWork _uow;
        public AddRegisteredCoursesCommand(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public IResult Execute(IRequest request)
        {
            if (request is AddRegisteredCoursesRequest addRegisteredCourse)
            {
                var course = addRegisteredCourse.RegisteredCourses.FirstOrDefault();
                var registeredCourses = _uow.Students.GetRegisteredCourses(course.AcademicYear, course.Semester, course.ProgramId);
                if(registeredCourses.Any())
                    return new Result(false, "Sorry You Have Already Registered");
                var courses = addRegisteredCourse
                             .RegisteredCourses
                             .Select(x => x.Map<RegisteredCourse, RegisteredCourseDto>())
                             .ToList();

                if (_uow.Students.RegisterCourses(courses))
                     return new Result(true, "Course(s) Registered Successfully");
            }
            return new Result(false, Message.OperationFailed);
        }
    }
}

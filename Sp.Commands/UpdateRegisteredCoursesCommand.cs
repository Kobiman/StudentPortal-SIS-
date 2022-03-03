using KMapper;
using Sp.Models.Dtos.Request;
using SP.Common;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces.Commands;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Commands
{
    public class UpdateRegisteredCoursesCommand : IUpdateRegisteredCoursesCommand
    {
        private readonly IUnitOfWork _uow;
        public UpdateRegisteredCoursesCommand(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public IResult Execute(IRequest request)
        {
            if (request is UpdateRegisteredCoursesRequest updatedRegisteredCourse)
            {
                var course = updatedRegisteredCourse.RegisteredCourses.FirstOrDefault();

                var courses = updatedRegisteredCourse
                             .RegisteredCourses
                             .Select(x => x.Map<RegisteredCourse, RegisteredCourseDto>())
                             .ToList();

                if (_uow.Students.UpdateRegisteredCourses(courses))
                    return new Result(true, "Course(s) Registered Successfully");
            }
            return new Result(false, Message.OperationFailed);
        }
    }
}

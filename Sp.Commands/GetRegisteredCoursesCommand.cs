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
    public class GetRegisteredCoursesCommand : IGetRegisteredCoursesCommand
    {
        private readonly IUnitOfWork _uow;
        public GetRegisteredCoursesCommand(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public IResult Execute(IRequest request)
        {
            if (request is GetRegisteredCoursesRequest r)
            {
                var registeredCourses = _uow.Students
                                      .GetStudent(r.IndexNumber)
                                     ?.GetRegisteredCourses(r.AcademicYear,r.Semester.ToUpper());

                var program = _uow.Programs.GetProgram(registeredCourses?.FirstOrDefault()?.ProgramOfStudy);
                if (program == null) return new Result(false, Message.OperationFailed);

                var response = (from registeredCourse in registeredCourses
                           let mountedcourse = program.GetMountedCourse(registeredCourse.MountedCourseId)
                           select new GetRegisteredCoursesResponse
                           {
                               RegistrationDate = registeredCourse.RegistrationDate,
                               AcademicYear = registeredCourse.AcademicYear,
                               Approved = registeredCourse.Approved,
                               IndexNumber = registeredCourse.IndexNumber,
                               Semester = registeredCourse.Semester,
                               Level = registeredCourse.Level,
                               StudentId = registeredCourse.StudentId,
                               StudentName = registeredCourse.StudentName,
                               CourseCode = mountedcourse?.CourseCode,
                               CourseName = mountedcourse?.CourseName,
                               Credit = mountedcourse.Credit,
                               RegisteredCourseId = registeredCourse.RegisteredCourseId,
                               Scoring = mountedcourse.Scoring,
                           }).ToList();

                if (response == null) return new Result(false, Message.OperationFailed);
                
                return new Result<IEnumerable<GetRegisteredCoursesResponse>>
                    (true, response, Message.FetchOperationCompletedSuccesfully);
            }

            return new Result(false, Message.OperationFailed);
        }        
    }
}

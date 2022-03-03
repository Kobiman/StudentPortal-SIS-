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
    public class ApproveRegisteredCoursesCommand : IApproveRegisteredCoursesCommand
    {
        private readonly IUnitOfWork _uow;
        public ApproveRegisteredCoursesCommand(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public IResult Execute(IRequest request)
        {
            if (request is ApproveRegisteredCoursesRequest approveRegisteredCoursesRequest)
            {
                _uow.Students.ApproveRegistration(approveRegisteredCoursesRequest.ApproveRegisteredCourses);
                return new Result(true, Message.OperationCompletedSuccesfully);
                //foreach (var c in approveRegisteredCoursesRequest.ApproveRegisteredCourses)
                //{
                //    var student = _uow.Students.GetStudent(c.IndexNumber);
                //   foreach(var course in c.ApproveCourses)
                //    {
                //        student.RegisteredCourses.FirstOrDefault(x => x.RegisteredCourseId == course.RegisteredCourseId).Approved = course.Approved;
                //    }
                //}

                //_uow.SaveChanges(approveRegisteredCoursesRequest.ApproveRegisteredCourses,nameof(RegisteredCourse));
            }

            return new Result(false, Message.OperationFailed);
        }
    }
}

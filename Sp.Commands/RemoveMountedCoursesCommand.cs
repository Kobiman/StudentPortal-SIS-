using KMapper;
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

namespace SP.Commands
{
    public class RemoveMountedCoursesCommand : IRemoveMountedCoursesCommand
    {
        private readonly IUnitOfWork _uow;
        public RemoveMountedCoursesCommand(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public IResult Execute(IRequest request)
        {
            if (request is RemoveMountedCoursesRequest mountedcourse)
            {
                    ICollection<ValidationResult> results = new List<ValidationResult>();
                    if (!mountedcourse.Validate(out results)) return new Result(false, results.First().ErrorMessage);

                //var RemovemountedCourse = mountedcourse.

                var program = _uow.Programs.GetProgram(mountedcourse.ProgramId);
                var mountedCousre = program.MountedCourses.FirstOrDefault(x=> x.MountedCourseId == mountedcourse.MountedCourseId);
                program.MountedCourses.Remove(mountedCousre);
                _uow.SaveChanges(new List<MountedCourse> { mountedCousre },nameof(MountedCourse));
                return new Result(true, Message.DeleteOperationCompletedSuccesfully);
            }
            return new Result(true, "");
        }
    }

   
}

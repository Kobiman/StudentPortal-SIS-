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
    public class AddMountedCourseCommand : IAddMountedCourseCommand
    {
        private readonly IUnitOfWork _uow;
        public AddMountedCourseCommand(IUnitOfWork uow)
        {
            _uow = uow;
        }


        public IResult Execute(IRequest request)
        {
            if (request is AddMountedCourseRequest mountedcourse)
            {
                //foreach (var m in mountedcourse.MountedCourses)
                //{
                //    ICollection<ValidationResult> results = new List<ValidationResult>();
                //    if (!m.Validate(out results)) return new Result(false, results.First().ErrorMessage);
                //}

                var program = _uow.Programs.GetProgram(mountedcourse.MountedCourses.First().ProgramId);
                if(program is null) return new Result(false, Message.OperationFailed);

                foreach (var m in mountedcourse.MountedCourses)
                {
                    var mountedCourse = program.MountedCourses.FirstOrDefault(x => x.AcademicYear == m.AcademicYear &&
                                                                   x.EnrollmentOption == m.EnrollmentOption &&
                                                                   x.Semester==m.Semester && x.Level==m.Level &&
                                                                   x.CourseCode==m.CourseCode &&
                                                                   x.ProgramId==m.ProgramId);

                    if (mountedCourse != null)
                    {
                        return
                            new Result(false,
                            Message.AlreadyExist($"{mountedCourse.CourseCode}, {mountedCourse.CourseName},{mountedCourse.Level}"));
                    }
                }

                var courses = mountedcourse
                             .MountedCourses
                             .Select(x=>x.Map<MountedCourse, MountedCourseDto>())
                             .ToList();

                _uow.Programs.MountCourses(courses);

                _uow.SaveChanges(courses,nameof(MountedCourse));
                return new Result(true,Message.OperationCompletedSuccesfully);
            }
            return new Result(false, Message.OperationFailed);
        }

        
    }
}

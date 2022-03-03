using Sp.Models.Dtos.Request;
using SP.Common;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Commands
{
    public class MigrateCourseCommand : IMigrateCourseCommand
    {

        private readonly IUnitOfWork _uow;
        public MigrateCourseCommand(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public IResult Execute(IRequest request)
        {
            if (request is MigrateCourseRequest r)
            {
                var temp = r.AcademicYear.Split("/")[0];
                int iay = int.Parse(temp) - 1;
                var previousAcademicYear = iay.ToString() + "/" + temp;

                var previousMountedCourses = _uow.Programs.GetAllMountedCourses(previousAcademicYear, r.Semester).ToList();
                var currentMountedCourses = _uow.Programs.GetAllMountedCourses(r.AcademicYear, r.Semester).ToList();
                List<MountedCourse> mountedCoursesList = new();
                foreach (var mCourse in previousMountedCourses)
                {
                    var currentMountedCourse = currentMountedCourses.FirstOrDefault(x=>x.AcademicYear != mCourse.AcademicYear && x.Semester == mCourse.Semester && x.EnrollmentOption == mCourse.EnrollmentOption);
                    if(currentMountedCourse is null)
                        mountedCoursesList.Add(mCourse);
                }
                foreach (var p in mountedCoursesList.GroupBy(x => x.ProgramId))
                {
                     _uow.Programs.MountCourses(p.ToList());
                }
                _uow.SaveChanges(mountedCoursesList, nameof(MountedCourse));
                return new Result(true, Message.OperationCompletedSuccesfully);
            }
            return new Result(false, Message.OperationFailed);
        }
    }
}

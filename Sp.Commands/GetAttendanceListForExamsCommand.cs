using Sp.Models.Dtos.Request;
using Sp.Models.Dtos.Response;
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
    public class GetAttendanceListForExamsCommand : IGetAttendanceListForExamsCommand
    {
        private readonly IUnitOfWork _uow;
        public GetAttendanceListForExamsCommand(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public IResult Execute(IRequest request)
        {
            var r = (GetAttendanceListForExamsRequest)request;
            var programs = _uow.Programs.GetPrograms().ToDictionary(x => x.ProgramId, y => y.Name);
            var mountedCourses = _uow.Programs.GetAllMountedCourses(r.AcademicYear, r.Semester.ToUpper());
            var mountedCoursesWithStudents = GetMountedCoursesWithStudents(mountedCourses, programs)
                .OrderBy(x => x.CourseCode)
                .ThenBy(x=>x.Program);
            return new Result<IEnumerable<AttendanceListResponse>>(true, mountedCoursesWithStudents, Message.OperationCompletedSuccesfully);
        }

        private IEnumerable<AttendanceListResponse> GetMountedCoursesWithStudents(IEnumerable<MountedCourse> mountedCourses, Dictionary<string, string> programs)
        {
             foreach(var m in mountedCourses)
             {
                var registeredCourses =
                   _uow.Students
                   .GetRegisteredStudents(m.MountedCourseId,
                                          m.Semester,
                                          m.AcademicYear,
                                          m.ProgramId);
                   yield return new AttendanceListResponse
                   (
                       m.CourseCode,
                       m.Credit,
                       m.CourseName,
                       programs[m.ProgramId],
                       m.Level,
                       m.Semester,
                       m.AssignedTo,
                       registeredCourses
                   );
             }
        }
    }
}

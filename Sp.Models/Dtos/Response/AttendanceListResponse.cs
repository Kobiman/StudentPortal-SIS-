using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Models.Dtos.Response
{
    public record AttendanceListResponse(
        string CourseCode, 
        int Credit,
        string CourseTitle,
        string Program,
        string Level,
        string Semester,
        string LecturerId,
        IEnumerable<GetRegisteredStudentsReponse> RegisteredStudents
    );
}

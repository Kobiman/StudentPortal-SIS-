using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Models.Dtos.Response
{
    public record CheckResultResponse(string Name,string Program,string IndexNmber,string Gender,string UniversityEmail,string PersonalEmail,DateTime DateOfBirth, IEnumerable<ExamResultsDto> ExamResults);
}

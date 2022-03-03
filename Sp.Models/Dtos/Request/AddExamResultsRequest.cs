using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Models.Dtos.Request
{
    public class AddExamResultsRequest : IRequest
    {
        public AddExamResultsRequest(ExamResult[] examResults)
        {
            ExamResults = examResults;
        }
        public ExamResult[] ExamResults { get; }
    }
}

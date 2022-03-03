using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces.Commands;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Services.Interfaces.Repository
{
    public interface IExamResultsRepository : IRepository<StudentResult>
    {
        bool UploadExamResults(GetExamResultsRequest request);
        IList<StudentResult> GetByStudent(string studentId);
    }
}

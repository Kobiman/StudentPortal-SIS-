using SP.Models;
using SP.Services.Interfaces.Repository;
using System.Collections.Generic;
using KMapper;
using System;
using System.Linq;
using SP.Models.Dtos;
using System.Collections.ObjectModel;
using Microsoft.VisualBasic;
using SP.DAL.Repository;
using System.Collections.Concurrent;

namespace SP.DAL
{
    public class ExamResultsRepository : Repository<StudentResult>, IExamResultsRepository
    {
        public ExamResultsRepository(ConcurrentBag<StudentResult> collection) : base(collection)
        {
            
        }

        public IList<StudentResult> GetByStudent(string studentId)
        {
            throw new NotImplementedException();
        }

        public bool UploadExamResults(GetExamResultsRequest request)
        {
            var examresult = request.Map<StudentResult, GetExamResultsRequest>();
            Collection.Add(examresult);
            DataWriter.WriterData(examresult, nameof(StudentResult));
            return true;
        }
    }
}
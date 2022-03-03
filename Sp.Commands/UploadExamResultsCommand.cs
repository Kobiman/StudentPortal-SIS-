using KMapper;
using Sp.Models.Dtos.Request;
using SP.Common;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace SP.Commands
{
    public class UploadExamResultsCommand : IUploadExamResultsCommand
    {
        private readonly IUnitOfWork _uow;
        public UploadExamResultsCommand(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public IResult Execute(IRequest request)
        {
            if (request is UploadExamResultsRequest examResultsRequest)
            {
                if (examResultsRequest.StudentResults.Length == 0) return new Result(false, Message.OperationFailed);
                var examresults = examResultsRequest.StudentResults.Select(x => x.Map<StudentResult, ExamResult>()).ToList();
                if(_uow.Students.AddResults(examresults))
                  return new Result(true, Message.AddedSuccessfully(nameof(StudentResult)));
                return new Result(false, Message.OperationFailed);
            }
            return new Result(false, Message.OperationFailed);
        }
    }
}

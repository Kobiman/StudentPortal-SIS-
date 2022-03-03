using KMapper;
using Sp.Models.Dtos.Request;
using SP.Common;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces;
using SP.Services.Interfaces.Commands;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace SP.Commands
{
    public class AddExamResultsCommand : IAddExamResultsCommand
    {
        private readonly IUnitOfWork _uow;
        public AddExamResultsCommand(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public IResult Execute(IRequest request)
        {
            if (request is AddExamResultsRequest e)
            {
                if(!_uow.Students.GetStudentResults(e.ExamResults[0].AcademicYear, e.ExamResults[0].ProgramId, e.ExamResults[0].Level).Any())
                {
                    var examresults = e.ExamResults.Select(x => x.Map<StudentResult, ExamResult>()).ToList();
                    if (_uow.Students.AddResults(examresults))
                        return new Result(true, Message.AddedSuccessfully(nameof(StudentResult)));
                    return new Result(false, Message.OperationFailed);
                }
                return new Result(false, Message.AlreadyExist(nameof(StudentResult)));
            }
            return new Result(false, Message.OperationFailed);
        }
    }
}

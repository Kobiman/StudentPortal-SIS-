using SP.Common;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using KMapper;
using SP.Services.Interfaces;
using System.Security.Cryptography.X509Certificates;
using SP.Commands;
using SP.Services.Interfaces.Commands;
using Sp.Models.Dtos.Response;

namespace SP.Commands
{
    public class CheckResultCommand : ICheckResultCommand
    {
        private readonly IUnitOfWork _uow;
        public CheckResultCommand(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public IResult Execute(IRequest request)
        {
            if (request is CheckResultRequest checkResultRequest) 
            {
              if (!checkResultRequest.Validate(out ICollection<ValidationResult>  validationResults)) 
                    return new Result(false, validationResults.First().ErrorMessage);
                var student = _uow.Students.GetStudent(checkResultRequest.IndexNumber);
                if(student == null) return new Result(false, "Sorry, No Record Found");
                var program = _uow.Programs.GetProgram(student.ProgramId);
                if(program == null) return new Result(false, "Sorry, No Record Found");
                var studentResults = student.GetResult(program.GetMountedCourses());               
                if (studentResults == null) return new Result(false, "Sorry, No Record Found");
                var result = new CheckResultResponse(
                                                       $"{student.Surname} {student.Othernames}", 
                                                       program.Name, 
                                                       student.IndexNumber,
                                                       student.Gender, 
                                                       student.UniversityEmail, 
                                                       student.PersonalEmail, 
                                                       student.DateofBirth, 
                                                       studentResults);
                return new Result<CheckResultResponse>(true, result, Message.OperationCompletedSuccesfully);
            }
            return new Result(false, "Sorry, No Record Found");
        }
    }
}

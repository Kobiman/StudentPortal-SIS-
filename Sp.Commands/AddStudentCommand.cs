using KMapper;
using SP.Common;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces.Commands;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace SP.Commands
{
    public class AddStudentCommand : IAddStudentCommand
    {
        private readonly IUnitOfWork _uow;
        public AddStudentCommand(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public IResult Execute(IRequest request)
        {
            if (request is AddStudentRequest addStudentRequest)
            {
                AddStudentRequest model = addStudentRequest;
                ICollection<ValidationResult> results = new List<ValidationResult>();
                if (!model.Validate(out results)) return new Result(false, results.First().ErrorMessage);

                _uow.Students.AddStudent(addStudentRequest);
                _uow.SaveChanges();
                return new Result<Student>(true, null, "Student Added Successfully");
            }
            return new Result(true, "");
        }
    }
}

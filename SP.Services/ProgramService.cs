using KMapper;
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

namespace SP.Services
{
    public class ProgramService : IProgramService
    {
        private readonly IUnitOfWork _uow;
        public ProgramService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public IResult AddProgram(AddProgramRequest request)
        {
            ICollection<ValidationResult> results = new List<ValidationResult>();
            if (!request.Validate(out results)) return new Result(false, results.First().ErrorMessage);
            _uow.Programs.AddProgram(request);
            return new Result(true, "Program Added Successfully");
        }

        public IResult GetProgram(string programId)
        {
            if (string.IsNullOrWhiteSpace(programId)) return new Result(false, "ProgramId cannot be null");
            var program = _uow.Programs.GetProgram(programId);
            if (program == null) return new Result(false, "ProgramId was not found");
            return new Result<GetProgramResponse>(true, program.Map<GetProgramResponse, Program>(), "");
        }

        public IResult GetProgramByName(string name)
        {
            if (string.IsNullOrWhiteSpace(name)) return new Result(false, "Program name cannot be null");
            var program = _uow.Programs.GetPrograms().FirstOrDefault(x=>x.Name == name);
            if (program == null) return new Result(false, "Program name was not found");
            return new Result<Program>(true, program, "");
        }

        public IResult GetPrograms()
        {
            return new Result<IEnumerable<GetProgramsResponse>>(true,
                _uow.Programs.GetPrograms().Select(x => x.Map<GetProgramsResponse, Program>()).ToList(), "");
        }

        public IResult UpdateProgram(UpdateProgramRequest request)
        {
            ICollection<ValidationResult> results = new List<ValidationResult>();
            if (!request.Validate(out results)) return new Result(false, results.First().ErrorMessage);
            if (!_uow.Programs.UpdateProgram(request)) return new Result(false, "Could Not Update Program");
            return new Result(true, "Program Updated Successfully");
        }
    }
}

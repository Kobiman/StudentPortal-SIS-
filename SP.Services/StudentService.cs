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

namespace SP.Services
{
    public class StudentService : IStudentService
    {
        private readonly IUnitOfWork _uow;
        public StudentService(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public IResult AddStudent(AddStudentRequest request)
        {
            ICollection<ValidationResult> results = new List<ValidationResult>();
            if (!request.Validate(out results)) return new Result(false, results.First().ErrorMessage);

            var program = _uow.Programs.GetProgram(request.ProgramId);
            if(program is null) return new Result(false, $"Can not find program {request.ProgramId}");
            request.DepartmentId = program.ProgramId;
            _uow.Students.AddStudent(request);
            return new Result(true, "Student Added Successfully");
        }

        public IResult UpdateStudent(UpdateStudentRequest request)
        {
            if(!_uow.Students.UpdateStudent(request)) return new Result(false, "Could Not Update Student");
            return new Result(true, "Student Updated Successfully");
        }

        public IResult AddStudents(IEnumerable<AddStudentRequest> request)
        {
            foreach (var student in request)
            {
                ICollection<ValidationResult> results = new List<ValidationResult>();
                if (!student.Validate(out results)) return new Result(false, results.First().ErrorMessage);

                if (_uow.Students.IndexNumberExist(student.IndexNumber)) 
                     return new Result(false, "IndexNumber Exist");
                if (_uow.Students.ReferenceNumberExist(student.ReferenceNumber))
                    return new Result(false, "Reference Number Exist");

                var program = _uow.Programs.GetProgram(student.ProgramId);
                if(program is null) return new Result(false, "Program cannot be null");

                student.DepartmentId = program.ProgramId;
            }
            var students = request.Select(x=>x.Map<Student, AddStudentRequest>()).ToList();
            _uow.Students.AddStudents(students);
            _uow.SaveChanges();
            return new Result<IEnumerable<Student>>(true, students, "Students Added Successfully");
        }

        public IResult UpdateStudents(IEnumerable<UpdateStudentRequest> students)
        {
            foreach (var student in students)
            {
                ICollection<ValidationResult> results = new List<ValidationResult>();
                if (!student.Validate(out results)) return new Result(false, results.First().ErrorMessage);
            }
            _uow.Students.UpdateStudents(students);
            _uow.SaveChanges();
            return new Result(true, "Students Updated Successfully");
        }

        public IResult UpdateSpecialization(string indexNumber, string specializationId)
        {
            if (indexNumber is null && specializationId is null)return new Result(false, "IndexNumber cannot be null");
            var student = _uow.Students.GetStudent(indexNumber);
            student.Specialization = specializationId;
            if (student is null) return new Result(false, "IndexNumber cannot be null");
            _uow.Students.UpdateStudent(student.Map<UpdateStudentRequest, Student>());
            return new Result(true, "Student Updated Successfully");
        }

        public IResult GetStudent(string indexNumber)
        {
            if (string.IsNullOrWhiteSpace(indexNumber)) return new Result(false, "IndexNumber cannot be null");
            var student = _uow.Students.GetStudent(indexNumber);
            if(student == null)return new Result(false, "IndexNumber was not found");
            return new Result<Student>(true, student ,"");
        }

        public IResult GetStudentsByLevel(string level)
        {
            if (string.IsNullOrWhiteSpace(level)) return new Result(false, "Level cannot be null");
            return new Result<IEnumerable<Student>>(true, _uow.Students.GetStudentsByLevel(level), "");
        }

        public IResult GetStudents()
        {
            return new Result<IEnumerable<Student>>(true, 
                _uow.Students.GetStudents(), "");//.Select(x=>x.Map<GetStudentsResponse, Student>()).ToList()
        }
    }
}

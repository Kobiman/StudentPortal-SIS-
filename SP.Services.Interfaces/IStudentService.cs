using SP.Models;
using SP.Models.Dtos;
using System;
using System.Collections.Generic;

namespace SP.Services.Interfaces
{
    public interface IStudentService
    {
        IResult AddStudent(AddStudentRequest student);
        IResult AddStudents(IEnumerable<AddStudentRequest> student);
        IResult UpdateStudent(UpdateStudentRequest student);
        IResult UpdateStudents(IEnumerable<UpdateStudentRequest> students);
        IResult GetStudent(string indexNumber);
        IResult GetStudentsByLevel(string level);
        IResult GetStudents();
        IResult UpdateSpecialization(string indexNumber, string specializationId);
    }
}

using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.TestInfrastructure.StudentServiceTest
{
    public static class StudentServiceData
    {
        public static AddStudentRequest GetStudent()
        {
            return new AddStudentRequest
            {
                IndexNumber = "12345fd",
                ReferenceNumber = "12345de",
                Surname = "Lawson",
                Othernames = "Kobina",
                Title = "Mr",
                Gender = "M",
                MaritalStatus = "Single",
                DateofBirth = "6/8/1991",
                Country = "Ghana",
                Region = "Western Region",
                HomeTown = "Cape Coast",
                Disability = false,
                Address1 = "Berlin Top",
                Address2 = "Dominion City",
                Contact1 = "0205742832",
                Contact2 = "0124585145",
                PersonalEmail = "kobiman91@gmail.com",
                StudentType = "Undergraduate",
                EnrolmentOption = "Regular",
                ResidentialStatus = "Resident",
                ProgramId = "BSc. Computer Science",
                Specialization = "Software Engineering",
                ProgramStatus = "Inprogress",
                UniversityEmail = "kobina.lawson@uenr.edu.gh",
                Level = "400",
                DateOfEntry = DateTime.Now,
                PamentOption = "GFP"
            };
        }

        public static IEnumerable<AddStudentRequest> GetStudents()
        {
            return new List<AddStudentRequest>
            {
                new AddStudentRequest
                {
                    IndexNumber = "123454kk",
                    ReferenceNumber = "12345dd",
                    Surname = "Lawson",
                    Othernames = "Kobina",
                    Title = "Mr",
                    Gender = "M",
                    MaritalStatus = "Single",
                    DateofBirth = "6/8/1991",
                    Country = "Ghana",
                    Region = "Western Region",
                    HomeTown = "Cape Coast",
                    Disability = false,
                    Contact1 = "0205742832",
                    Contact2 = "0214578512",
                    Address1 = "Berlin Top",
                    Address2 = "Dominion City",
                    PersonalEmail = "kobiman91@gmail.com",
                    StudentType = "Undergraduate",
                    EnrolmentOption = "Regular",
                    ResidentialStatus = "Resident",
                    ProgramId = "BSc. Computer Science",
                    Specialization = "Software Engineering",
                    ProgramStatus = "Inprogress",
                    UniversityEmail = "kobina.lawson@uenr.edu.gh",
                    Level = "400",
                    DateOfEntry = DateTime.Now,
                    PamentOption = "GFP"
                },

                new AddStudentRequest
                {
                    IndexNumber = "123454d",
                    ReferenceNumber = "123445d",
                    Surname = "Lawson",
                    Othernames = "Kobina",
                    Title = "Mr",
                    Gender = "M",
                    MaritalStatus = "Single",
                    DateofBirth = "6/8/1991",
                    Country = "Ghana",
                    Region = "Western Region",
                    HomeTown = "Cape Coast",
                    Disability = false,
                    Address1 = "Berlin Top",
                    Address2 = "Dominion City",
                    Contact1 = "0205742832",
                    Contact2 = "0214578512",
                    PersonalEmail = "kobiman91@gmail.com",
                    StudentType = "Undergraduate",
                    EnrolmentOption = "Regular",
                    ResidentialStatus = "Resident",
                    ProgramId = "BSc. Computer Science",
                    Specialization = "Software Engineering",
                    ProgramStatus = "Inprogress",
                    UniversityEmail = "kobina.lawson@uenr.edu.gh",
                    Level = "400",
                    DateOfEntry = DateTime.Now,
                    PamentOption = "GFP"
                }
            };
        }

        public static void AddStudent(IStudentService _studentService, IProgramService _programService)
        {
            var request = new AddStudentRequest
            {
                IndexNumber = "12345",
                ReferenceNumber = "12345",
                Surname = "Lawson",
                Othernames = "Kobina",
                Title = "Mr",
                Gender = "M",
                MaritalStatus = "Single",
                DateofBirth = "6/8/1991",
                Country = "Ghana",
                Region = "Western Region",
                HomeTown = "Cape Coast",
                Disability = false,
                Address1 = "Berlin Top",
                Address2 = "Dominion City",
                Contact1 = "0205742832",
                Contact2 = "0124585145",
                PersonalEmail = "kobiman91@gmail.com",
                StudentType = "Undergraduate",
                EnrolmentOption = "Regular",
                ResidentialStatus = "Resident",
                ProgramId = "BSc. Computer Science",
                Specialization = "Software Engineering",
                ProgramStatus = "Inprogress",
                UniversityEmail = "kobina.lawson@uenr.edu.gh",
                Level = "400",
                DateOfEntry = DateTime.Now,
                PamentOption = "GFP"
            };

            _programService.AddProgram(new AddProgramRequest { DepartmentId = "xdssd", Name = "BSc. Computer Science" });
            var program = _programService.GetProgramByName("BSc. Computer Science") as Result<Program>;
            request.ProgramId = program.Value.ProgramId;

            _studentService.AddStudent(request);
        }
    }
}

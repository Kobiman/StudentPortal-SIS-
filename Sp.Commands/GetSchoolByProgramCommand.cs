using SP.Common;
using SP.Models;
using SP.Models.Dtos;
using SP.Models.Dtos.Response;
using SP.Services.Interfaces.Commands;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Commands
{
    public class GetSchoolByProgramCommand : IGetSchoolByProgramCommand
    {
        private readonly IUnitOfWork _uow;
        public GetSchoolByProgramCommand(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public IResult Execute(IRequest request)
        {
            if(request is GetSchoolByProgramRequest r)
            {
                var program = _uow.Programs.GetProgram(r?.Program);
                var department = _uow.Departments.GetDepartment(program?.DepartmentId);
                var school = _uow.Schools.GetSchool(department?.SchoolId);
                if(school == null) return new Result(false, Message.CannotBeNull(nameof(School)));
                return new Result<GetSchoolByProgramResponse>(true,
                                                new GetSchoolByProgramResponse 
                                                { 
                                                    AcademicYear = school.AcademicYear,
                                                    InstitutionId = school.InstitutionId,
                                                    SchoolId = school.SchoolId,
                                                    Name = school.Name,
                                                    RegistrationStatus = school.RegistrationActivated,
                                                    ResultUpload = school.ResultUploaded,
                                                    Semester = school.Semester
                                                },
                                                Message.FetchOperationCompletedSuccesfully);
                
            }
            return new Result(false, Message.OperationFailed);
        }
    }
}

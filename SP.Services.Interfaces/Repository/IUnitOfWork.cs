using SP.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Services.Interfaces.Repository
{
    public interface IUnitOfWork
    {
        IPagesRepository Pages { get; }
        ICourseRepository Courses { get; }
        ILookupRepository Lookups { get; }
        ISchoolRepository Schools { get; }
        IStudentRepository Students { get; }
        IProgramRepository Programs { get; }
        ILecturerRepository Lecturers { get; }
        IDepartmentRepository Departments { get; }
        IInstitutionRepository Institutions { get; }
        IStatusControlRepository StatusControls { get; }
        IGradesSettingsRepository GradesSettings { get; }              
        IUserPermissionRepository UserPermissions { get; }

        void SaveChanges();
        void SaveChanges<T>(IList<T> data, string table);
    }
}

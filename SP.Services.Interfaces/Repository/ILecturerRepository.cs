using SP.Models;
using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Services.Interfaces.Repository
{
    public interface ILecturerRepository
    {
        bool AddLecturer(Lecturer lecturer);
        Lecturer GetLecturer(string lecturerId);
        IEnumerable<Lecturer> GetLecturers();
        bool UpdateLecturer(UpdateLecturerRequest lecturer);
        Lecturer GetLecturerByStaffId(string staffId);
    }
}

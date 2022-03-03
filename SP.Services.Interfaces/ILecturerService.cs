using SP.Models;
using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.Services.Interfaces
{
    public interface ILecturerService
    {
        IResult AddLecturer(Lecturer lecturer);
        IResult GetLecturer(string lecturerId);
        IResult GetLecturers();
        IResult UpdateLecturer(UpdateLecturerRequest lecturer);
        IResult GetLecturerByStaffId(string staffId);
    }
}

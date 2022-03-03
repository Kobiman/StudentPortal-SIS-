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
    public class LecturerService : ILecturerService
    {
        private readonly IUnitOfWork _uow;
        public LecturerService(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public IResult AddLecturer(Lecturer lecturer)
        {
            ICollection<ValidationResult> results = new List<ValidationResult>();
            if (!lecturer.Validate(out results)) return new Result(false, results.First().ErrorMessage);
            _uow.Lecturers.AddLecturer(lecturer);
            return new Result(true, Message.AddedSuccessfully(nameof(Lecturer)));
        }

        public IResult GetLecturer(string lecturerId)
        {
            if (string.IsNullOrWhiteSpace(lecturerId)) return new Result(false, Message.CannotBeNull(nameof(Lecturer)));
            var lecturer = _uow.Lecturers.GetLecturer(lecturerId);
            if (lecturer == null) return new Result(false, Message.NotFound(nameof(Lecturer)));
            return new Result<Lecturer>(true, lecturer, Message.AddedSuccessfully(nameof(Lecturer)));
        }

        public IResult GetLecturerByStaffId(string staffId)
        {
            if (string.IsNullOrWhiteSpace(staffId)) return new Result(false, Message.CannotBeNull(staffId));
            var lecturer = _uow.Lecturers.GetLecturerByStaffId(staffId);
            if (lecturer == null) return new Result(false, Message.NotFound(nameof(Lecturer)));
            return new Result<Lecturer>(true, lecturer, Message.OperationFailed);
        }

        public IResult GetLecturers()
        {
            return new Result<IEnumerable<Lecturer>>(true,
               _uow.Lecturers.GetLecturers(), Message.FetchOperationCompletedSuccesfully);
        }

        public IResult UpdateLecturer(UpdateLecturerRequest lecturer)
        {
            if (!_uow.Lecturers.UpdateLecturer(lecturer)) 
            return new Result(false, Message.CouldNotUpdate(nameof(Lecturer)));
            _uow.SaveChanges();
            return new Result(true, Message.UpdatedSuccessfully(nameof(Lecturer)));
        }
    }
}

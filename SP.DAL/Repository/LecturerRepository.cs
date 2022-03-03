using SP.DAL.Models;
using SP.DAL.Repository;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SP.DAL.Repository
{
    public class LecturerRepository : ILecturerRepository
    {
        private LecturerDM Collection;
        public LecturerRepository(LecturerDM collection)
        {
            Collection = collection;
        }

        public bool AddLecturer(Lecturer lecturer)
        {
            Collection.Add(lecturer);
            DataWriter.Add(lecturer, nameof(Lecturer));
            return true;
        }

        public Lecturer GetLecturer(string lecturerId)
        {
            var result = Collection.Find((x, y) => x.LecturerId[y] == lecturerId);
            return CreateLecturer(result);
        }

        public Lecturer GetLecturerByStaffId(string staffId)
        {
            var result = Collection.Find((x, y) => x.StaffId[y] == staffId);
            return CreateLecturer(result);
        }

        public IEnumerable<Lecturer> GetLecturers()
        {
            return Collection.Select((x, y) => CreateLecturer(x, y));
        }

        public bool UpdateLecturer(UpdateLecturerRequest lecturer)
        {
            var result = Collection.Find((x, y) => x.LecturerId[y] == lecturer.LecturerId);
            if (result.success)
            {
                result.Value.Address[result.Index] = lecturer.Address;
                result.Value.Email[result.Index] = lecturer.Email;
                result.Value.Name[result.Index] = lecturer.Name;
                result.Value.Status[result.Index] = lecturer.Status;
                result.Value.Telephone[result.Index] = lecturer.Telephone;
                result.Value.State[result.Index]++;

                DataWriter.Add(CreateLecturer(result.Value,result.Index), nameof(Lecturer));
                return true;
            }
            return false;
        }

        private Lecturer CreateLecturer((LecturerDM Value, int Index, bool Success) result)
        {
            if (!result.Success) return default;
            return new Lecturer
            {
                Address = result.Value.Address[result.Index],
                DepartmentId = result.Value.DepartmentId[result.Index],
                Email = result.Value.Email[result.Index],
                LecturerId = result.Value.LecturerId[result.Index],
                Name = result.Value.Name[result.Index],
                StaffId = result.Value.StaffId[result.Index],
                Telephone = result.Value.Telephone[result.Index],
                Status = result.Value.Status[result.Index],
                State = result.Value.State[result.Index]
            };
        }

        private Lecturer CreateLecturer(LecturerDM Value, int Index)
        {
            return new Lecturer
            {
                Address = Value.Address[Index],
                DepartmentId = Value.DepartmentId[Index],
                Email = Value.Email[Index],
                LecturerId = Value.LecturerId[Index],
                Name = Value.Name[Index],
                StaffId = Value.StaffId[Index],
                Telephone = Value.Telephone[Index],
                Status = Value.Status[Index],
                State = Value.State[Index]
            };
        }
    }
}

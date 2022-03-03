using SP.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.DAL.Models
{
    public class SchoolDM
    {
            public SchoolDM(int length)
            {
                SchoolId = new string[length];
                Name = new string[length];
                AcademicYear = new string[length];
                Semester = new string[length];
                RegistrationActivated = new bool[length];
                ResultUploaded = new bool[length];
                InstitutionId = new string[length];
         LecturerId = new string[length];
                State = new int[length];
    }
            public void Add(School type)
            {

                lock (type)
                {
                    if (Count == SchoolId.Length)
                    {
                        var newLength = SchoolId.Length + 5;
                        var _SchoolId = new string[newLength];
                        SchoolId.CopyTo(_SchoolId,0);
                        SchoolId = _SchoolId;
                        var _Name = new string[newLength];
                        Name.CopyTo(_Name, 0);
                        Name = _Name;
                        var _AcademicYear = new string[newLength];
                        AcademicYear.CopyTo(_AcademicYear, 0);
                        AcademicYear = _AcademicYear;
                        var _Semester = new string[newLength];
                        Semester.CopyTo(_Semester, 0);
                        Semester = _Semester;
                        var _RegistrationActivated = new bool[newLength];
                        RegistrationActivated.CopyTo(_RegistrationActivated, 0);
                        RegistrationActivated = _RegistrationActivated;
                        var _ResultUploaded = new bool[newLength];
                        ResultUploaded.CopyTo(_ResultUploaded, 0);
                        ResultUploaded = _ResultUploaded;
                        var _InstitutionId = new string[newLength];
                        InstitutionId.CopyTo(_InstitutionId, 0);
                        InstitutionId = _InstitutionId;
                        var _State = new int[newLength];
                        State.CopyTo(_State, 0);
                        State = _State;
                        var _LecturerId = new string[newLength];
                        LecturerId.CopyTo(_LecturerId, 0);
                        LecturerId = _LecturerId;

                    }
                    SchoolId[Count] = type.SchoolId;
                    Name[Count] = type.Name;
                    AcademicYear[Count] = type.AcademicYear;
                    Semester[Count] = type.Semester;
                    RegistrationActivated[Count] = type.RegistrationActivated;
                    ResultUploaded[Count] = type.ResultUploaded;
                    InstitutionId[Count] = type.InstitutionId;
                LecturerId[Count] = type.LecturerId;
        State[Count]++;
                    Count++;
                }
            }


            public int Count;

            public string[] SchoolId;
            public string[] Name;
            public string[] AcademicYear;
            public string[] Semester;
            public bool[] RegistrationActivated;
            public bool[] ResultUploaded;
            public string[] InstitutionId;
         public string[] LecturerId;
        public int[] State;

    }
}

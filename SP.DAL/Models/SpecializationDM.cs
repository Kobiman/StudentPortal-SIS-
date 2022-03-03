using SP.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SP.DAL.Models
{
    public class SpecializationDM
    {
        public SpecializationDM(int length)
        {
            this.length = length;
            SpecializationId = new string[length];
            Name = new string[length];
            Type = new string[length];
            Level = new string[length];
            ProgramId = new string[length];
            State = new int[length];
        }
        public void Add(Specialization type)
        {

            lock (type)
            {
                if (Count == SpecializationId.Length)
                {
                    var newLength = SpecializationId.Length + 100;
                    var _SpecializationId = new string[newLength];
                    SpecializationId.CopyTo(_SpecializationId, 0);
                    SpecializationId = _SpecializationId;
                    var _Name = new string[newLength];
                    Name.CopyTo(_Name, 0);
                    Name = _Name;
                    var _Type = new string[newLength];
                    Type.CopyTo(_Type, 0);
                    Type = _Type;
                    var _Level = new string[newLength];
                    Level.CopyTo(_Level, 0);
                    Level = _Level;
                    var _ProgramId = new string[newLength];
                    ProgramId.CopyTo(_ProgramId, 0);
                    ProgramId = _ProgramId;
                    var _State = new int[newLength];
                    State.CopyTo(_State, 0);
                    State = _State;
                }
                SpecializationId[Count] = type.SpecializationId;
                Name[Count] = type.Name;
                Type[Count] = type.Type;
                Level[Count] = type.Level;
                ProgramId[Count] = type.ProgramId;
                State[Count] = type.State;
                Count++;
            }
        }

        private readonly int length;


        public int Count;

        public string[] SpecializationId;
        public string[] Name;
        public string[] Type;
        public string[] Level;
        public string[] ProgramId;
        public int[] State;

        public void Remove(int position)
        {
            SpecializationId.Remove(position, Count);
            Name.Remove(position, Count);
            Type.Remove(position, Count);
            Level.Remove(position, Count);
            ProgramId.Remove(position, Count);
            State.Remove(position, Count);
            Count--;
        }
    }
}

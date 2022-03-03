using Sp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SP.DAL.Models
{
    public class UserPermissionDM
    {
        public UserPermissionDM(int lenght)
        {
            Id = new string[lenght];
            UserId =new string[lenght];
            PageId = new string[lenght];
            Deleted = new bool[lenght];
            State = new int[lenght];
        }
        public void Add(UserPermission permission)
        {
            lock (permission) 
            { 
               if (Count == UserId.Length)
               {
               
                   var newLength = Id.Length + 15;
                   var _Id = new string[newLength];
                   Id.CopyTo(_Id, 0);
                   Id = _Id;
               
                   var _UserId = new string[newLength];
                   UserId.CopyTo(_UserId, 0);
                   UserId = _UserId;
               
                   var _PageId = new string[newLength];
                   PageId.CopyTo(_PageId, 0);
                   PageId = _PageId;

                   var _Deleted = new bool[newLength];
                   Deleted.CopyTo(_Deleted, 0);
                   Deleted = _Deleted;

                    var _State = new int[newLength];
                   State.CopyTo(_State, 0);
                   State = _State;
               }
            }

            Id[Count] = permission.Id;
            UserId[Count] = permission.UserId;
            PageId[Count] = permission.PageId;
            Deleted[Count] = permission.Deleted;
            State[Count]+=1;
            Count+=1;

        }

        public void Update(IList<UserPermission> permissions)
        {
            var originalPremissions = this.Select((x, y) => x.UserId[y] == permissions.FirstOrDefault().UserId,
               (x, y) => new UserPermission
               {
                   Id = x.Id[y],
                   PageId = x.PageId[y],
                   UserId = x.UserId[y],
                   State = x.State[y]
               }).ToList();
            if (originalPremissions.Count > permissions.Count)
            {
                foreach (var o in originalPremissions
                   .Where(o => !permissions.Any(e => e.Id == o.Id)))
                {
                    var ur = this.Find((x, y) => x.Id[y] == o.Id);
                    if (ur.success)
                    {
                        ur.Value.State[ur.Index] = ur.Value.State[ur.Index] + 1;
                        o.State = ur.Value.State[ur.Index];
                        RemoveUserPermission(ur.Index);
                        o.Deleted = true;
                        DataWriter.Add(o, nameof(UserPermission));
                    }
                }
            }
            foreach (var s in permissions)
            {
                var os = this.Find((x, y) => x.Id[y] == s.Id);
                if (os.success) continue;
                {
                    Add(s);
                    DataWriter.Add(s, nameof(UserPermission));
                }
            }
        }

        public void RemoveUserPermission(int index)
        {
           lock (this)
           {
               Id.Remove(index, Count);
               UserId.Remove(index, Count);
               PageId.Remove(index, Count);
               State.Remove(index, Count);
               Deleted.Remove(index, Count);
               Count--;
           }
        }

        public int Count;
        public string[] Id;
        public string[] PageId;
        public string[] UserId;
        public bool[] Deleted;
        public int[] State; 
    }
}

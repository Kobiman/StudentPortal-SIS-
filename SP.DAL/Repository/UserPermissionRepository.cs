using Sp.Models;
using SP.DAL.Models;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SP.DAL.Repository
{
    internal class UserPermissionRepository : IUserPermissionRepository
    {
        private UserPermissionDM Collection;
        public UserPermissionRepository(UserPermissionDM collection)
        {
            Collection = collection;
        }

        public bool AddUserPermission(UserPermission permission)
        {
            Collection.Add(permission);
            DataWriter.Add(permission, nameof(UserPermission));
            return true;
        }

        public bool UpdatePermissions(IList<UserPermission> permissions)
        {
            Collection.Update(permissions);
            return true;
        }

        public UserPermission GetUserPermission(string userPermissionId)
        {
            var result = Collection.Find((x, y) => x.UserId[y] == userPermissionId);
            return CreateUserPermission(result);
        }

        public IEnumerable<UserPermission> GetUserPermissionByStaffId(string staffId)
        {
            return Collection.Select((x,y)=>x.UserId[y]==staffId,(x, y) => CreateUserPermission(x, y));
        }
        public bool DeleteUserPermission(string userPermissionId)
        {
            var userPermission = Collection.Find((x, y) => x.Id[y] == userPermissionId);
            if (!userPermission.success) return false;
            userPermission.Value.RemoveUserPermission(userPermission.Index);
            return true;
        }

        private UserPermission CreateUserPermission((UserPermissionDM Value, int Index, bool Success) result)
        {
            if (!result.Success) return default;
            return new UserPermission
            {
                Id = result.Value.Id[result.Index],
                UserId = result.Value.UserId[result.Index],
                PageId = result.Value.PageId[result.Index],
                State = result.Value.State[result.Index]
            };
        }

        private UserPermission CreateUserPermission(UserPermissionDM Value, int Index)
        {
            return new UserPermission
            {
                Id = Value.Id[Index],
                UserId = Value.UserId[Index],
                PageId = Value.PageId[Index],
                Deleted = Value.Deleted[Index],
                State = Value.State[Index]
            };
        }
    }

}

using Sp.Models;
using SP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SP.Services.Interfaces.Repository
{
   public interface IUserPermissionRepository
   {
       bool AddUserPermission(UserPermission permission);
       UserPermission GetUserPermission(string userPermissionId);
       bool DeleteUserPermission(string userPermissionId);
       IEnumerable<UserPermission> GetUserPermissionByStaffId(string staffId);
       bool UpdatePermissions(IList<UserPermission> userPermissions);
    }
}

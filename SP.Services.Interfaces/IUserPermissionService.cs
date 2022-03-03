using Sp.Models;
using SP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SP.Services.Interfaces
{
    public interface IUserPermissionService
    {
        IResult AddUserPermission(UserPermission userPermission);
        IResult AddUserPermission(IList<UserPermission> userPermissions);
        IResult UpdateUserPermissions(IList<UserPermission> userPermissions);
        IResult GetUserPermission(string userPermissionId);
        IResult DeleteUserPermission(string userPermissionId);
        IResult GetUserPermissionsByStaffId(string staffId);
        IResult GetUserPermissions(string userId);
    }
}

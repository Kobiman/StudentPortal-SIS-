using Sp.Models;
using Sp.Models.Dtos;
using SP.Common;
using SP.Models;
using SP.Services.Interfaces;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SP.Services
{
    public class UserPermissionService : IUserPermissionService
    {
        private readonly IUnitOfWork _uow;
        public UserPermissionService(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public IResult AddUserPermission(UserPermission userPermission)
        {
            if(_uow.UserPermissions.AddUserPermission(userPermission))
             return new Result(true, Message.AddedSuccessfully(nameof(UserPermission)));
            return new Result(false, Message.OperationFailed);
        }

        public IResult AddUserPermission(IList<UserPermission> userPermissions)
        {
            foreach (var userPermission in userPermissions) { 
               _uow.UserPermissions.AddUserPermission(userPermission);
            }
            return new Result(true, Message.AddedSuccessfully(nameof(UserPermission)));
        }

        public IResult UpdateUserPermissions(IList<UserPermission> permissions)
        {
            _uow.UserPermissions.UpdatePermissions(permissions);
            return new Result(true, Message.AddedSuccessfully(nameof(UserPermission)));
        }

        public IResult GetUserPermission(string userPermissionId)
        {
            if (string.IsNullOrWhiteSpace(userPermissionId)) return new Result(false, Message.CannotBeNull(nameof(UserPermission)));
            var userPermission = _uow.UserPermissions.GetUserPermission(userPermissionId);
            if (userPermission == null) return new Result(false, Message.NotFound(nameof(UserPermission)));
            return new Result<UserPermission>(true, userPermission, Message.AddedSuccessfully(nameof(UserPermission)));
        }

        public IResult DeleteUserPermission(string userPermissionId)
        {
         
            if (string.IsNullOrWhiteSpace(userPermissionId)) return new Result(false, Message.CannotBeNull(nameof(UserPermission)));
            if (_uow.UserPermissions.DeleteUserPermission(userPermissionId))
                return new Result(true, Message.FetchOperationCompletedSuccesfully);
            return new Result(true, Message.OperationFailed);
        }

        public IResult GetUserPermissionsByStaffId(string staffId)
        {
            if (string.IsNullOrWhiteSpace(staffId)) return new Result(false, Message.CannotBeNull(staffId));
            var userPermission = _uow.UserPermissions.GetUserPermissionByStaffId(staffId);
            if (userPermission == null) return new Result(false, Message.NotFound(nameof(UserPermission)));
            return new Result<IEnumerable<UserPermission>>(true, userPermission, Message.OperationFailed);
        }

        public IResult GetUserPermissions(string userId)
        {
            if (string.IsNullOrWhiteSpace(userId)) return new Result(false, Message.CannotBeNull(userId));
            var pages = _uow.Pages.GetPages();
            var permissions = _uow.UserPermissions.GetUserPermissionByStaffId(userId);
            if (permissions == null) return new Result(false, Message.NotFound(nameof(PermissionDto)));
            var joinedPermisions = Join(permissions, pages);
            return new Result<IEnumerable<PermissionDto>>(true, joinedPermisions, Message.OperationFailed);
        }

        private IEnumerable<PermissionDto> Join(IEnumerable<UserPermission> permissions, IEnumerable<Page> pages)
        {
            foreach (var permission in permissions)
            {
                foreach (var p in pages)
                {
                    if (permission.PageId == p.Id)
                    {
                        yield return new PermissionDto { PageId = p.Id, Route = p.Route, Title = p.Title, Id = permission.Id, UserId = permission.UserId };
                        break;
                    }
                }
            }
        }
    }
}

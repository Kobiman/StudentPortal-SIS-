using System;
using System.Collections.Generic;
using System.Net.Http.Headers;
using System.Text;

namespace SP.Common
{
    public class Message
    {
        #region Operation Message Templates

        public const string DeleteOperationCompletedSuccesfully = "Delete operation completed Successfully";
        public const string FetchOperationCompletedSuccesfully = "Fetch operation completed successfully";
        public const string OperationCompletedSuccesfully = "Operation completed succesfully";
        public const string OperationFailed = "Operation failed";


        public static string AddedSuccessfully(string name) => $"{name} added Successfully";
        public static string UpdatedSuccessfully(string name) => $"{name} updated Successfully";
        public static string AlreadyExist(string name) => $"{name} Already Exist";
        public static string CannotBeNull(string name) => $"{name} cannot be null";
        public static string CouldNotUpdate(string name) => $"Could not update {name}";
        public static string NotFound(string value) => $"Could not find {value}";
        public static string OperationFail(string value) => $"Operation failed {value}";
        #endregion
    }
}

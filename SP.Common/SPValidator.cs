using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace SP.Common
{
    public static class SPValidator
    {
        public static bool Validate(this object obj, out ICollection<ValidationResult> results)
        {
            var context = new ValidationContext(obj, serviceProvider: null, items: null);
            results = new List<ValidationResult>();
            return Validator.TryValidateObject(obj, context, results, validateAllProperties: true);
        }


        //private static string Validate<T>(this T request)
        //{
        //    ICollection<ValidationResult> results = new List<ValidationResult>();
        //    request.Validate(out results); 
        //    return results.First().ErrorMessage;
        //}
        
    }
}

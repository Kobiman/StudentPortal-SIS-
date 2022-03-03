using SP.Common;
using SP.Models;
using SP.Services.Interfaces;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace SP.Services
{
    public class LookupService : ILookupService
    {
        private readonly IUnitOfWork _uow;
        public LookupService(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public IResult AddLookup(Lookup lookup)
        {
            if (lookup == null) return new Result(false, Message.CannotBeNull(nameof(Lookup)));

            ICollection<ValidationResult> results = new List<ValidationResult>();

            if (!lookup.Validate(out results)) return new Result(false, Message.OperationFailed);

            if (_uow.Lookups.Exist(lookup)) return new Result(false, Message.OperationFailed);

            _uow.Lookups.AddLookup(lookup);

            return new Result(true, Message.OperationCompletedSuccesfully);
        }

        public IResult GetLookup(string lookupId)
        {
            if (string.IsNullOrWhiteSpace(lookupId)) return new Result(false, Message.CannotBeNull(nameof(Lookup)));
            var lookup = _uow.Lookups.GetLookup(lookupId);
            if (lookup == null) return new Result(false, Message.NotFound(lookupId));
            return new Result<Lookup>(true, lookup, Message.OperationCompletedSuccesfully);
        }

        public IResult GetLookups()
        {
            return new Result<IEnumerable<Lookup>>(true,
               _uow.Lookups.GetLookups(), Message.OperationCompletedSuccesfully);
        }

        public IResult UpdateLookup(Lookup lookup)
        {
            ICollection<ValidationResult> results = new List<ValidationResult>();
            if (!lookup.Validate(out results)) return new Result(false, results.First().ErrorMessage);
            if (!_uow.Lookups.UpdateLookup(lookup))
                return new Result(false, Message.CouldNotUpdate(nameof(Lookup)));
            return new Result(true, "Course Updated Successfully");
        }
    }
}

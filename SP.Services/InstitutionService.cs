using SP.Common;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace SP.Services
{    
    public class InstitutionService : IInstitutionService
    {
        private readonly IUnitOfWork _uow;
        public InstitutionService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public IResult AddInstitution(Institution institution)
        {
            ICollection<ValidationResult> results = new List<ValidationResult>();
            if (!institution.Validate(out results)) return new Result(false, results.First().ErrorMessage);
            _uow.Institutions.AddInstitution(institution);
            return new Result(true, "Institution Added Successfully");
        }

        public IResult UpdateInstitution(UpdateInstitutionRequest institution)
        {
            if (!_uow.Institutions.UpdateInstitution(institution)) return new Result(false, "Could Not Update Institution");
            return new Result(true, "Institution Updated Successfully");
        }

        public IResult GetInstitution(string institutionId)
        {
            if (string.IsNullOrWhiteSpace(institutionId)) return new Result(false, "InstitutionId cannot be null");
            var institution = _uow.Institutions.GetInstitution(institutionId);
            if (institution == null) return new Result(false, "InstitutionId was not found");
            return new Result<Institution>(true, institution, "");
        }

        public IResult GetInstitutions()
        {
            return new Result<IEnumerable<Institution>>(true,
                _uow.Institutions.GetInstitutions(), "");
        }

    }
}

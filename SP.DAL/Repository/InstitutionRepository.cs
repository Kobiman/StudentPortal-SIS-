using KMapper;
using SP.DAL;
using SP.DAL.Models;
using SP.DAL.Repository;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SP.DAL.Repository
{
    public class InstitutionRepository : IInstitutionRepository
    {
        private InstitutionDM Collection;
        public InstitutionRepository(InstitutionDM collection) //: base(collection)
        {
            Collection = collection;
        }

        public bool AddInstitution(Institution institution)
        {
            Collection.Add(institution);
            DataWriter.Add(institution, nameof(Institution));
            return true;
        }

        public Institution GetInstitution(string institutionId)
        {
            var result = Collection.Find((x,y) => x.InstitutionId[y] == institutionId);
            return CreateInstitution(result);
        }

        public IEnumerable<Institution> GetInstitutions()
        {
            return Collection.Select((x,y)=> CreateInstitution(x,y));
        }

        public bool UpdateInstitution(UpdateInstitutionRequest institution)
        {
            var result = Collection.Find((x, y) => x.InstitutionId[y] == institution.InstitutionId);
            var originalInstitution = CreateInstitution(result);
            if (originalInstitution == null) return false;
            institution.Map(originalInstitution);
            DataWriter.Add(originalInstitution, nameof(Institution));
            return true;
        }

        private Institution CreateInstitution(InstitutionDM Value, int Index)
        {
            return new Institution
            {
                City = Value.City[Index],
                Code = Value.Code[Index],
                Country = Value.Country[Index],
                DateCreated = Value.DateCreated[Index],
                Email = Value.Email[Index],
                InstitutionId = Value.InstitutionId[Index],
                Logo = Value.Logo[Index],
                Name = Value.Name[Index],
                PostalAddress = Value.PostalAddress[Index],
                Telephone = Value.Telephone[Index]
            };
        }
        private Institution CreateInstitution((InstitutionDM Value, int Index, bool success) result)
        {
            if (!result.success) return null;
            return CreateInstitution(result.Value, result.Index);
        }
    }
}

using SP.Models;
using SP.Models.Dtos;
using Sp.Models.Dtos.Request;
using SP.Services.Interfaces.Commands;
using SP.Services.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SP.Common;
using KMapper;

namespace Sp.Commands
{
    // Approve results should be three phases department School and Academic board
    // Results can be viewed By Student after it has been approved by academic board
  public  class ApproveResultsCommand : IApproveResultsCommand
    {
        private readonly IUnitOfWork _uow;
        public ApproveResultsCommand(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public IResult Execute(IRequest request)
        {
            if (request is ApproveResultsRequest r)
            {
               //if (r.ApproveResults.Count() == 0) return new Result(false, Message.OperationFailed);
               foreach (var result in r.ApproveResults.GroupBy(x => x.IndexNumber))
               {
                   _uow.Students.UpdateResults(result.ToList());
               }

               return new Result(true, Message.OperationCompletedSuccesfully);
            }
            return new Result(false, Message.OperationFailed);
        }
    }
}

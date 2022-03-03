using IdentityModel.Client;
using Newtonsoft.Json;
using Sp.Models.Dtos;
using Sp.Models.Dtos.Request;
using SP.Common;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces.Commands;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Commands
{
    public class CanRegisterStudentCommand : ICanRegisterStudentCommand
    {
        public async Task<IResult> Execute(IRequest request)
        {
            var r = request as CanRegisterStudentRequest;
            var transactions = await $"https://fms.uenr.edu.gh/api/fee-transction/get-statement/{r.IndexNumber}".Get<Result<List<FeeTransactionDto>>>();
            if(transactions.Value.Any())
            {
                var amountDue = transactions.Value.OrderByDescending(x=>x.AcademicYear).FirstOrDefault(x => x.Amount < 0)?.Amount??100000;
                var balance = transactions.Value.Sum(x => x.Amount);
                if (balance >= Math.Abs(amountDue) * 0.5)
                   return new Result<bool>(true,true, Message.OperationCompletedSuccesfully);
                return new Result<bool>(false, false, Message.OperationFailed);
            }
            return new Result<bool>(false, false, Message.OperationFailed);
        }
    }
}

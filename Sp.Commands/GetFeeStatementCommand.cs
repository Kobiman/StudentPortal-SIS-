using Sp.Models.Dtos;
using Sp.Models.Dtos.Request;
using SP.Common;
using SP.Models;
using SP.Models.Dtos;
using SP.Services.Interfaces.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Commands
{
    public class GetFeeStatementCommand : IGetFeeStatementCommand
    {
        public async Task<IResult> Execute(IRequest request)
        {
            var r = request as GetFeeStatementRequest;
            return await $"https://fms.uenr.edu.gh/api/fee-transction/get-statement/{r.IndexNumber}".Get<Result<List<FeeTransactionDto>>>();
        }
    }
}

using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Models.Dtos.Request
{
    public  class ApproveResultsRequest: IRequest
    {

        public ApproveResultsRequest(IEnumerable<ApproveResultsDto> approveResults)
        {
            ApproveResults = approveResults;
        }

        public IEnumerable<ApproveResultsDto> ApproveResults { get; }

    }
    public class ApproveResultsDto
    {
        [Required]
        public string ExamResultId { get; set; }
        [Required]
        public string IndexNumber { get; set; }
        public string Status { get; set; }
        public string Comment { get; set; }
    }

}


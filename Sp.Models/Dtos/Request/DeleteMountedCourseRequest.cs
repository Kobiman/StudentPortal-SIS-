using SP.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Models.Dtos.Request
{
    public class DeleteMountedCourseRequest : IRequest
    {
        public DeleteMountedCourseRequest(string programId,string mountedCourseId)
        {
            MountedCourseId = mountedCourseId;
            ProgramId = programId;
        }
        public string MountedCourseId { get; }
        public string ProgramId { get; }
    }
}

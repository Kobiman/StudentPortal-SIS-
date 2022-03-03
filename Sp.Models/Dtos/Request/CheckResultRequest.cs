using SP.Models.Dtos;

namespace SP.Models.Dtos
{
    public class CheckResultRequest : IRequest
    {
        public CheckResultRequest(string indexNumber)
        {
            IndexNumber = indexNumber;
        }

        public string IndexNumber { get; }
    }
}
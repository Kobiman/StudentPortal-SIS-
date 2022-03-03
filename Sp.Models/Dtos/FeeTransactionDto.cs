using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sp.Models.Dtos
{
    public class FeeTransactionDto
    {
        public string Id { get; set; }
        public DateTime TransactionDate { get; set; }
        public double Amount { get; set; }
        public double Debit { get; set; }
        public double Credit { get; set; }
        public double Balance { get; set; }
        public string AcademicYear { get; set; }
        public string ReceiptNumber { get; set; }
        public bool ReceiptIssued { get; set; }
        public string Bank { get; set; }
        public string Naration { get; set; }
        public string Level { get; set; }
        public string Semester { get; set; }
        public string StudentId { get; set; }
        public string ReferenceNumber { get; set; }
        //public bool Deleted { get; set; }
    }
}

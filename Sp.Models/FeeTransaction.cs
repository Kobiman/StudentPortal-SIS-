using System;

namespace SP.Models
{
    public class FeeTransaction
    {
        public string FeeTransactionId { get; set; }
        public DateTime PaymentDate { get; set; }
        public double Debit { get; set; }
        public double Credit { get; set; }
        public string AcademicYear { get; set; }
        public string ReceiptNumber { get; set; }
        public string Bank { get; set; }

        public string StudentId { get; set; }
        public Student Student { get; set; }
    }
}
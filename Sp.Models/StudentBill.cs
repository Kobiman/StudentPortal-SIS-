namespace SP.Models
{
    public class StudentBill
    {
        public string StudentBillId { get; set; }
        //public StudentBillSetUp Bill { get; set; }
        //public double Arears { get; set; }
        public double AmountDue { get; set; }
        public double Balance { get; set; }

        public string StudentId { get; set; }
        public Student Student { get; set; }

        public void GenerateStudentBill(string studentId)
        {

        }
    }
}
using RTD_Alerts.Enumerations;

namespace RTD_Alerts.Models
{
    public class User
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public Transit Transit { get; set; }
    }
}
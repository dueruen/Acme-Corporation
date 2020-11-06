using System.ComponentModel.DataAnnotations;

namespace api.Model.Requests
{
    public class ContestModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string SerialNumber { get; set; }
    }
}

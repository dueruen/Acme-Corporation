using System.ComponentModel.DataAnnotations;

namespace api.Model.Requests
{
    public class LoginModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [StringLength(60, MinimumLength = 8)]
        public string Password { get; set; }
    }
}

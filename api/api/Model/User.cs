using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using System.Collections.Generic;
using api.Model;

namespace api.Model
{
    public class User 
    {
        [Key]
        public long Id { get; set; }
        
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [JsonIgnore]
        [StringLength(60, MinimumLength = 8)]
        public string Password { get; set; }

        [JsonIgnore]
        public string Salt { get; set; }

        public User() { }
    }
}

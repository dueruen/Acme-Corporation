using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace api.Model
{
    public class ContestParticipant 
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [JsonIgnore]
        public virtual ICollection<SerialNumber> SerialNumbers { get; set; }

        public ContestParticipant() {
            SerialNumbers = new List<SerialNumber>();
        }
    }
}

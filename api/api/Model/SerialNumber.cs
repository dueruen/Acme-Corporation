using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace api.Model
{
    public class SerialNumber 
    {
        [JsonIgnore]
        [Key]
        public long Id { get; set; }

        public string Number { get; set; }

        [Required]
        public int Redeemed { get; set; }

        [JsonIgnore]
        public long? ContestParticipantId { get; set; }

        public SerialNumber() {
            Number = Guid.NewGuid().ToString();
            Redeemed = 0;
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using api.Model;
using api.Persistence.Repositories.Interfaces;
using api.Model.Requests;

namespace api.Controllers
{
    [AllowAnonymous]
    [Route("[controller]")]
    [ApiController]
    public class ContestController : Controller
    {
        private ISerialNumberRepository serialNumberRepository;
        private IContestParticipantRepository contestParticipantRepository;

        public ContestController(ISerialNumberRepository serialNumberRepository, IContestParticipantRepository contestParticipantRepository)
        {
            this.serialNumberRepository = serialNumberRepository;
            this.contestParticipantRepository = contestParticipantRepository;
        }

        [HttpPost]
        public ActionResult Submit([FromBody]ContestModel contestModel)
        {
            SerialNumber serialNumber = serialNumberRepository.Get(contestModel.SerialNumber);
            if (serialNumber == null) {
                return BadRequest("Bad serial number");
            }

            ContestParticipant participant = contestParticipantRepository.Get(contestModel.Email, contestModel.FirstName, contestModel.LastName);
            if (participant == null && serialNumber.ContestParticipantId != null) {
                return BadRequest("Bad serial number");
            }
            if (participant == null) {
                participant = new ContestParticipant{
                    Email = contestModel.Email,
                    FirstName = contestModel.FirstName,
                    LastName = contestModel.LastName
                };
                contestParticipantRepository.Create(participant);
            }

            if (serialNumber.ContestParticipantId == null) {
                serialNumber.ContestParticipantId = participant.Id;
                serialNumber.Redeemed = 1;
                serialNumberRepository.Update(serialNumber);
            } else {
                bool found = false;
                foreach (SerialNumber sn in participant.SerialNumbers) {
                    if (sn.Number != contestModel.SerialNumber) {
                        continue;
                    }
                    if (sn.Redeemed >= 2) {
                        return BadRequest("Serial number is already redemed 2 times");
                    }
                    found = true;
                    sn.Redeemed++;
                    contestParticipantRepository.Update(participant);
                }    
                if (!found) {
                    return BadRequest("Bad serial number");
                }            
            }

            return new OkResult();
        }
    }
}

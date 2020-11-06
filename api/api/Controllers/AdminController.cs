using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using api.Persistence.Repositories.Interfaces;

namespace api.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class AdminController : Controller
    {
        private IContestParticipantRepository contestParticipantRepository;

        public AdminController(IContestParticipantRepository contestParticipantRepository)
        {
            this.contestParticipantRepository = contestParticipantRepository;
        }

        [HttpGet]
        [Route("list")]
        public ActionResult GetSubmissions()
        {
            return new ObjectResult(contestParticipantRepository.GetAll());
        }
    }
}

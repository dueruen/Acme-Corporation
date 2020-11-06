using System.Collections.Generic;
using api.Model;

namespace api.Persistence.Repositories.Interfaces
{
    public interface IContestParticipantRepository
    {
        ContestParticipant Get(long Id);
        ContestParticipant Get(string Email, string FirstName, string LastName);
        IEnumerable<ContestParticipant> GetAll();
        void Create(ContestParticipant participant);
        void Update(ContestParticipant participant);
    }
}

using System.Collections.Generic;
using api.Model;
using api.Model.Requests;
using System.Linq;
using api.Persistence.Repositories.Interfaces;

namespace ApiUnitTests.FakeRepositories
{
    public class FakeContestParticipantRepository : IContestParticipantRepository
    {
        private List<ContestParticipant> list;

        public FakeContestParticipantRepository()
        {
            this.list = new List<ContestParticipant>()
            {
                new ContestParticipant()
                {
                    Id = 1,
                    Email = "mail@mail.com",
                    FirstName = "First",
                    LastName = "Last",
                    SerialNumbers = new List<SerialNumber>()
                    {
                        new SerialNumber()
                        {
                            Id = 1,
                            Number = "testNumber",
                            Redeemed = 1,
                            ContestParticipantId = 1
                        },
                        new SerialNumber()
                        {
                            Id = 3,
                            Number = "maxReemed",
                            Redeemed = 2,
                            ContestParticipantId = 1
                        }
                    }
                }
            };
        }

        public void Create(ContestParticipant participant)
        {
            list.Add(participant);
        }

        public ContestParticipant Get(long Id)
        {
            return list.Where(t => t.Id == Id).SingleOrDefault();
        }

        public ContestParticipant Get(string Email, string FirstName, string LastName)
        {
            return list.Where(c => c.Email == Email && c.FirstName == FirstName && c.LastName == LastName).SingleOrDefault();
        }

        public IEnumerable<ContestParticipant> GetAll()
        {
            return list;
        }

        public void Update(ContestParticipant participant)
        {
            ContestParticipant old = Get(participant.Id);
            int index = list.IndexOf(old);

            list[index] = participant;
        }
  }
}

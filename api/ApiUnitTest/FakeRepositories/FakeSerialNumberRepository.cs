using System.Collections.Generic;
using api.Model;
using api.Model.Requests;
using System.Linq;
using api.Persistence.Repositories.Interfaces;

namespace ApiUnitTests.FakeRepositories
{
    public class FakeSerialNumberRepository : ISerialNumberRepository
    {
        private List<SerialNumber> list;

        public FakeSerialNumberRepository()
        {
            this.list = new List<SerialNumber>()
            {
                new SerialNumber()
                {
                    Id = 1,
                    Number = "testNumber",
                    Redeemed = 1
                },
                new SerialNumber()
                {
                    Id = 2,
                    Number = "notRedeemed",
                    Redeemed = 1
                },
                new SerialNumber()
                {
                    Id = 3,
                    Number = "maxReemed",
                    Redeemed = 2,
                    ContestParticipantId = 1
                }
            };
        }

        public bool Create(SerialNumber participant)
        {
            list.Add(participant);
            return true;
        }

        public SerialNumber Get(long Id)
        {
            return list.Where(t => t.Id == Id).SingleOrDefault();
        }

        public SerialNumber Get(string Number)
        {
            return list.Where(t => t.Number == Number).SingleOrDefault();
        }

    public IEnumerable<SerialNumber> GetAll()
        {
            return list;
        }

        public void Update(SerialNumber participant)
        {
            SerialNumber old = Get(participant.Id);
            int index = list.IndexOf(old);

            list[index] = participant;
        }
  }
}

using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using api.Persistence.DatabaseContext;
using api.Model;
using System.Linq;
using api.Persistence.Repositories.Interfaces;

namespace api.Persistence.Repositories
{
    public class ContestParticipantRepository : IContestParticipantRepository
    {
        private DbSet<ContestParticipant> contestParticipants;
        private PostgresContext context;

        public ContestParticipantRepository(PostgresContext db) {
            this.context = db;
            this.contestParticipants = db.Set<ContestParticipant>();
        }

        public ContestParticipant Get(long Id)
        {
            return contestParticipants.Where(c => c.Id == Id)
                .Include(c => c.SerialNumbers)
                .SingleOrDefault();
        }

        public ContestParticipant Get(string Email, string FirstName, string LastName)
        {
            return contestParticipants.Where(c => c.Email == Email && c.FirstName == FirstName && c.LastName == LastName)
                .Include(c => c.SerialNumbers)
                .SingleOrDefault();
        }

        public IEnumerable<ContestParticipant> GetAll()
        {
            return contestParticipants
                .Include(c => c.SerialNumbers)
                .ToList();
        }

        public void Create(ContestParticipant participant)
        {
            contestParticipants.Add(participant);
            context.SaveChanges();
        }

        public void Update(ContestParticipant participant)
        {
            contestParticipants.Update(participant);
            context.SaveChanges();
        }
    }
}

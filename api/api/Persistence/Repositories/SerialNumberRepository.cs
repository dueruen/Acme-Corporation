using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using api.Persistence.DatabaseContext;
using api.Model;
using System.Linq;
using api.Persistence.Repositories.Interfaces;

namespace api.Persistence.Repositories
{
    public class SerialNumberRepository : ISerialNumberRepository
    {
        private DbSet<SerialNumber> serialNumbers;
        private PostgresContext context;

        public SerialNumberRepository(PostgresContext db) {
            this.context = db;
            this.serialNumbers = db.Set<SerialNumber>();
        }

        public SerialNumber Get(string Number)
        {
            return serialNumbers.Where(s => s.Number == Number)
                .SingleOrDefault();
        }

        public void Update(SerialNumber s) {
            serialNumbers.Update(s); 
            context.SaveChanges();
        }
    }
}

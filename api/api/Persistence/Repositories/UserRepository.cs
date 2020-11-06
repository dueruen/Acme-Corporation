using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using api.Persistence.DatabaseContext;
using api.Model;
using System.Linq;
using api.Persistence.Repositories.Interfaces;

namespace api.Persistence.Repositories
{
    public class UserRepository : IUserRepository
    {
        private DbSet<User> users;
        private PostgresContext context;

        public UserRepository(PostgresContext db) {
            this.context = db;
            this.users = db.Set<User>();
        }

        public User GetById(int Id)
        {
            return users.Where(t => t.Id == Id)
                .SingleOrDefault();
        }

        public IEnumerable<User> GetAll()
        {
            return users.ToList();
        }

        public void Update(User user)
        {
            users.Update(user);
            context.SaveChanges();
        }
    }
}

using System.Collections.Generic;
using api.Model;

namespace api.Persistence.Repositories.Interfaces
{
    public interface IUserRepository
    {
        User GetById(int Id);
        IEnumerable<User> GetAll();
        void Update(User user);
    }
}

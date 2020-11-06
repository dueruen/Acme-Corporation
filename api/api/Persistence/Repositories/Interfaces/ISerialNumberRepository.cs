using System.Collections.Generic;
using api.Model;

namespace api.Persistence.Repositories.Interfaces
{
    public interface ISerialNumberRepository
    {
        SerialNumber Get(string Number);
        void Update(SerialNumber s);
    }
}

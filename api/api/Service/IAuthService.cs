using api.Model;
using api.Model.Requests;

namespace api.Service
{
    public interface IAuthService
    {
        User Authenticate(LoginModel loginModel);
    }
}

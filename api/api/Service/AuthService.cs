using api.Model;
using api.Model.Requests;
using System.Linq;
using api.Persistence.DatabaseContext;
using api.Persistence.Repositories.Interfaces;
using Auth;

namespace api.Service
{
    public class AuthService : IAuthService
    {
        private IPasswordService passwordService;
        private IUserRepository userRepository;

        public AuthService(IPasswordService passwordService, IUserRepository userRepository)
        {
            this.passwordService = passwordService;
            this.userRepository = userRepository;
        }

        public User Authenticate(LoginModel loginModel)
        {
            User potentialUser = (userRepository.GetAll())
                .SingleOrDefault(user => user.Email.Equals(loginModel.Email));

            if (potentialUser == null || !isPasswordCorrect(loginModel, potentialUser))
            {
                return null;
            }

            return potentialUser;
        }

        private bool isPasswordCorrect(LoginModel loginModel, User potentialUser)
        {
            return passwordService
                .GenerateSaltedHashedPassword(loginModel.Password, potentialUser.Salt)
                .Equals(potentialUser.Password);
        }
    }
}

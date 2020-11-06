using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Security.Claims;
using api.Model;
using api.Persistence.Repositories.Interfaces;
using Auth;
using api.Model.Requests;
using api.Service;

namespace api.Controllers
{
    [AllowAnonymous]
    [Route("[controller]")]
    [ApiController]
    public class TokenController : Controller
    {
        private IConfiguration config;
        private ITokenService tokenService;
        private IAuthService authService;
        private IUserRepository userRepository;

        public TokenController(IConfiguration config, ITokenService tokenService, IAuthService authService, IUserRepository userRepository)
        {
            this.config = config;
            this.tokenService = tokenService;
            this.authService = authService;
            this.userRepository = userRepository;
        }

        [HttpGet]
        public ActionResult Get() {
            return new OkResult();
        }

        [HttpPost]
        public ActionResult Create([FromBody]LoginModel login)
        {
            if (!TryValidateModel(login))
            {
                return BadRequest(new { error = "Model not valid" });
            }

            // Check's if user is autherised
            User user = authService.Authenticate(login);
            if (user == null)
            {
                return Unauthorized();
            }

            // Sets the claims for the tok en
            var usersClaims = new[]
            {
                // User Id
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            };

            string tokenString = tokenService.GenerateAccessToken(usersClaims, config["Jwt:Key"]);

            userRepository.Update(user);

            return new ObjectResult(new
            {
                accessToken = tokenString
            });
        }
    }
}

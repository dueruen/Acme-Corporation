using System.Collections.Generic;
using System.Security.Claims;

namespace Auth
{
    public interface ITokenService
    {
        string GenerateAccessToken(IEnumerable<Claim> claims, string JWTKey);

        ClaimsPrincipal GetPrincipalFromExpiredToken(string expiredToken, string JWTKey);
    }
}

using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Auth
{
    public class TokenService : ITokenService
    {
        public TokenService(IConfiguration config) {}

        // Generates a access token with claims
        public string GenerateAccessToken(IEnumerable<Claim> claims, string JWTKey)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JWTKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                //config["Jwt:Issuer"],
                //config["Jwt:Issuer"],
                audience: "Anyone",
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(15),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // Extracts the claims from expired token
        // Return null if token is not expired
        public ClaimsPrincipal GetPrincipalFromExpiredToken(string expiredToken, string JWTKey)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JWTKey));

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(expiredToken, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;

            var expireTimeInMilli = principal.Claims.Where(c => c.Type == "exp").Select(c => c.Value).SingleOrDefault();

            // Checks if token is expired
            if (CalculateExpireTime(expireTimeInMilli) > DateTime.UtcNow)
            {
                return null;
            }

            // Checks if token is valid
            if (
                jwtSecurityToken == null
                || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase)
            )
            {
                throw new SecurityTokenException("Invalid token");
            }

            return principal;
        }

        // Calculates datatime of expire time
        private DateTime CalculateExpireTime(string milli)
        {
            long ticks = long.Parse(milli + "000");

            var posixTime = DateTime.SpecifyKind(new DateTime(1970, 1, 1), DateTimeKind.Utc);
            var time = posixTime.AddMilliseconds(ticks);

            return time;
        }
    }
}

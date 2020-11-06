using System;
using System.Security.Cryptography;
using System.Text;

namespace Auth
{
    public class PasswordService : IPasswordService
    {
        public (string saltText, string saltechashedPassword) GenerateNewPassword(string oldPassword)
        {
            // generate a random salt
            var rng = RandomNumberGenerator.Create();
            var saltBytes = new byte[16];
            rng.GetBytes(saltBytes);
            string saltText = Convert.ToBase64String(saltBytes);

            return (saltText, GenerateSaltedHashedPassword(oldPassword, saltText));
        }

        public string GenerateSaltedHashedPassword(string password, string saltText)
        {
            // generate the salted and hashed password
            var sha = SHA256.Create();
            var saltedPassword = password + saltText;
            var saltedhashedPassword = Convert.ToBase64String(
            sha.ComputeHash(Encoding.Unicode.GetBytes(saltedPassword)));

            return saltedhashedPassword;
        }
    }
}

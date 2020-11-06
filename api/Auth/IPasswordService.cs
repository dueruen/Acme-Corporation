namespace Auth
{
    public interface IPasswordService
    {
        (string saltText, string saltechashedPassword) GenerateNewPassword(string oldPassword);

        string GenerateSaltedHashedPassword(string password, string saltText);
    }
}

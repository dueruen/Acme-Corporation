using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using api.Model;
using System.Collections.Generic;

namespace api.Persistence.DatabaseContext
{
    public static class Seed
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new PostgresContext(
                serviceProvider.GetRequiredService<DbContextOptions<PostgresContext>>()))
            {
                // Look for any Users
                if (context.Users.Any())
                {
                    return;   // DB has been seeded
                }

                context.Users.AddRange(
                    new User
                    {
                        Email = "admin@mail.com",
                        FirstName = "Admin",
                        LastName = "Admin",
                        Password = "YFvty9NF4RMGZwJfMuBiL7lsMVebE1xsItAt9qFRI3w=", ////12345678
                        Salt = "pFxZH4br1PTUImBtIUGljQ==",
                    }
                );

                var serialNumbers = new List<SerialNumber>();
                for (int i = 0; i < 100; i++) {
                    serialNumbers.Add(new SerialNumber());
                }
                context.SerialNumbers.AddRange(serialNumbers);
                context.SaveChanges();
            }
        }
    }
}

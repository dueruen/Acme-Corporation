using System;
using Xunit;
using api.Controllers;
using Microsoft.AspNetCore.Mvc;
using api.Model.Requests;
using ApiUnitTests.FakeRepositories;
using api.Persistence.Repositories.Interfaces;

namespace ApiUnitTest.UnitTests
{
    public class ContestControllerUnitTest
    {
        ContestController controller;
        ISerialNumberRepository serialNumberRepository;
        IContestParticipantRepository contestParticipantRepository;

        public ContestControllerUnitTest()
        {
            serialNumberRepository = new FakeSerialNumberRepository();
            contestParticipantRepository = new FakeContestParticipantRepository();
            controller = new ContestController(serialNumberRepository, contestParticipantRepository);
        }

        [Fact]
        public void ContestController_Submit_WhenGivenValidData()
        {
            ContestModel cm = new ContestModel() 
            {
                Email = "test@mail.com",
                FirstName = "First",
                LastName = "Last",
                SerialNumber = "notRedeemed"
            };
            var result = controller.Submit(cm) as OkResult;
            Assert.Equal(200, result.StatusCode);
        }

        [Fact]
        public void ContestController_Submit_WhenGivenInValid_SerialNumber()
        {
            ContestModel cm = new ContestModel() 
            {
                Email = "test@mail.com",
                FirstName = "First",
                LastName = "Last",
                SerialNumber = "wrong"
            };
            var result = controller.Submit(cm) as BadRequestObjectResult;
            Assert.Equal(400, result.StatusCode);
        }

        [Fact]
        public void ContestController_Submit_WhenGiven_Max_Redeemed()
        {
            ContestModel cm = new ContestModel() 
            {
                Email = "mail@mail.com",
                FirstName = "First",
                LastName = "Last",
                SerialNumber = "maxReemed"
            };
            var result = controller.Submit(cm) as BadRequestObjectResult;
            Assert.Equal(400, result.StatusCode);
        }
    }
}

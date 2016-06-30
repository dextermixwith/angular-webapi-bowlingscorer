using Xunit;
using BowlingScorer.MVC.Services.Factories;
using BowlingScorer.MVC.Controllers.API;
using BowlingScorer.MVC.Models;
using Moq;

namespace BowlingScorer.MVC.Tests.Controllers.API
{
    public class ScoreCardControllerTests
    {
        private Mock<IScoreCardFactory> _mockScoreCardRepositoryFactory;
        private ScoreCard _getEndpointResult;

        public ScoreCardControllerTests()
        {
            _mockScoreCardRepositoryFactory = new Mock<IScoreCardFactory>();
            _mockScoreCardRepositoryFactory
                .Setup(factory => factory.Create())
                .Returns(new ScoreCard());

            _getEndpointResult = new ScoreCardController(_mockScoreCardRepositoryFactory.Object).Get();
        }

        [Fact]
        public void ThenTheScoreCardRespositoryIsCreated() 
        {
            _mockScoreCardRepositoryFactory.Verify(factory => factory.Create());
        }

        [Fact]
        public void ThenTheScoreCardDataIsSentBackFromTheGetEndpoint()
        {
            Assert.IsType(typeof(ScoreCard), _getEndpointResult);
        }
    }
}

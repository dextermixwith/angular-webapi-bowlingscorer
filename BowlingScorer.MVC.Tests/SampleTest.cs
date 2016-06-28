using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;
using BowlingScorer.MVC;
using BowlingScorer.Controllers.API;

namespace BowlingScorer.MVC.Tests
{
    // see example explanation on xUnit.net website:
    // https://xunit.github.io/docs/getting-started-dnx.html
    public class SampleTest
    {
        [Fact]
        public void PassingTest()
        {
            Assert.Equal(4, Add(2, 2));
        }

        [Fact]
        public void FailingTest()
        {
            Assert.Equal(5, Add(2, 3));
        }

        [Fact]
        public void HomeControllerTest()
        {
            Assert.True(new ScoreCardController().Get().Contains("value1"));
        }
        
        int Add(int x, int y)
        {
            return x + y;
        }
    }
}

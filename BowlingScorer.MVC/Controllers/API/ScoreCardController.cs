using BowlingScorer.MVC.Services.Factories;
using Microsoft.AspNetCore.Mvc;
using BowlingScorer.MVC.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BowlingScorer.MVC.Controllers.API
{
    [Route("api/[controller]")]
    public class ScoreCardController : Controller
    {
        private IScoreCardFactory _scoreCardFactory;

        public ScoreCardController(IScoreCardFactory scoreCardFactory)
        {
            _scoreCardFactory= scoreCardFactory;
        }

        // GET api/values
        [HttpGet]
        public ScoreCard Get()
        {
            return _scoreCardFactory.Create();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

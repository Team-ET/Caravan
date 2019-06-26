const PersonalityInsightsV3 = require('ibm-watson/personality-insights/v3'); // watson personality-insights

const personalityInsights = new PersonalityInsightsV3({
  iam_apikey: `${process.env.PERSONALITY_INSIGHTS_IAM_APIKEY}`,
  version: '2016-10-19',
  url: `${process.env.PERSONALITY_INSIGHTS_URL}`
});

// send body of text to Watson API and get back an object of values and percentages
function getInsights(text, res) {
  personalityInsights.profile({
    content: 'The video game industry is constantly evolving I just needed to add a couple words to make the 100 count just like technology, and I have always been an avid gamer, which is what drew me to the software field.  Being able to work with multiple new technologies on a constant basis keeps the workflow from becoming stagnant.  I have always loved building computers and being able to design and create the software makes the whole experience more complete and rewarding. I feel a great sense of accomplishment in using new tech to solve old problems, and make ideas become even more viable in today’s ever-changing tech world.',
    content_type: 'text/plain',
    consumption_preferences: false
  })
    .then(result => {
      const values = {
        tradition: Math.trunc(result.values[0].percentile * 100),
        achievement: Math.trunc(result.values[1].percentile * 100),
        pleasure: Math.trunc(result.values[2].percentile * 100),
        stimulation: Math.trunc(result.values[3].percentile * 100),
        helpfulness: Math.trunc(result.values[4].percentile * 100),
      }
      res.send(JSON.stringify(values, null, 2));
    })
    .catch(err => {
      console.log('error:', err);
    })
}

// function for getting the avg of a group, for using when comparing the matching alogrithim
const groupAvg = (array) => {
  return array.reduce((total, curr) => {
    return {
      tradition: Math.trunc((total.tradition + curr.tradition) / person1.length),
      achievement: Math.trunc((total.achievement + curr.achievement) / person1.length),
      pleasure: Math.trunc((total.pleasure + curr.pleasure) / person1.length),
      stimulation: Math.trunc((total.stimulation + curr.stimulation) / person1.length),
      helpfulness: Math.trunc((total.helpfulness + curr.helpfulness) / person1.length),
    }
  })
}


module.exports = {
  getInsights,
  groupAvg
};
const PersonalityInsightsV3 = require('ibm-watson/personality-insights/v3'); // watson personality-insights
const { findUser, storeValues } = require('./helpers');

const personalityInsights = new PersonalityInsightsV3({
  iam_apikey: `${process.env.PERSONALITY_INSIGHTS_IAM_APIKEY}`,
  version: '2016-10-19',
  url: `${process.env.PERSONALITY_INSIGHTS_URL}`
});

// send body of text to Watson API and get back an object of values and percentages
function getInsights(text, id, res) {
  Promise.all([personalityInsights.profile({
    content: text,
    content_type: 'text/plain',
    consumption_preferences: false
  }), 
  findUser(id)])
    .then(results => {
      console.log(results);
      const values = {
        tradition: Math.trunc(results[0].values[0].percentile * 100),
        achievement: Math.trunc(results[0].values[1].percentile * 100),
        enjoyment: Math.trunc(results[0].values[2].percentile * 100),
        stimulation: Math.trunc(results[0].values[3].percentile * 100),
        helpfulness: Math.trunc(results[0].values[4].percentile * 100),
      }
      const { tradition, achievement, enjoyment, stimulation, helpfulness} = values;
      userId = results[1].dataValues.id;
      storeValues(tradition, achievement, enjoyment, stimulation, helpfulness, userId);
      res.send(values);
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
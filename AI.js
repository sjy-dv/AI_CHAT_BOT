const trainingData = require("./trainingData/한국어대화.json");
const brain = require("brain.js");

const neural_network = new brain.recurrent.LSTM();

const sampleData = trainingData.map((k) => ({
  input: k.Q,
  output: k.A,
}));

module.exports = {
  init: () => {
    console.log("training...");
    try {
      const train = neural_network.train(sampleData, {
        iterations: 5000,
        log: true,
        logPeriod: 5,
        learningRate: 0.3,
      });
      if (train) console.log("taining ok");
    } catch (error) {
      console.log(error);
    }
  },
  bot: async (msg) => {
    let output = await neural_network.run(msg);
    return output;
  },
};

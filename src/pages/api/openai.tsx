const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: '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',
});


const openai = new OpenAIApi(configuration);




export default async (req, res) => {
  if (req.body.prompt !== undefined) {
    const completion = await openai.createCompletion({
      model: "text-ada-001",
      prompt: `${req.body.prompt}`,
    });

    res.status(200).json({ text: `${completion.data.choices[0].text}` });
  } else {
    res.status(400).json({ text: "No prompt provided." });
  }
  
};
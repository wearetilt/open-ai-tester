const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: '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',
});


const openai = new OpenAIApi(configuration);




export default async (req, res) => {
  if (req.body.prompt !== undefined) {
    const response = await openai.createImage({
      // prompt: "photo realistic image of a pixar style cat in a field of poppies and a dog in the distance",
      prompt: `${req.body.prompt}`,
      n: 1,
      size: "512x512",
    });

    res.status(200).json({ image: `${response.data.data[0].url}` });
  } else {
    res.status(400).json({ text: "No prompt provided." });
  }
  
};

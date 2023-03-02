const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});


const openai = new OpenAIApi(configuration);




export default async (req: any, res: any) => {
  if (req.body.prompt !== undefined) {
    const response = await openai.createImage({
      // prompt: "photo realistic image of a pixar style cat in a field of poppies and a dog in the distance",
      model: "gpt-3.5-turbo",
      prompt: `${req.body.prompt}`,
      n: 1,
      size: "1024x1024",
    });

    res.status(200).json({ image: `${response.data.data[0].url}` });
  } else {
    res.status(400).json({ text: "No prompt provided." });
  }
  
};

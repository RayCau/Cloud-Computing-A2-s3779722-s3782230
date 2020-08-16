/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */ 

const cors = require('cors')({origin: true});
const language = require('@google-cloud/language');

exports.getSentiment = async(req, res) => {
  cors(req, res, async() => {
    const client = new language.LanguageServiceClient();

    const document = {
      content: req.body.message,
      type: 'PLAIN_TEXT'
    };

    const [result] = await client.analyzeSentiment({document});

    const sentiment = result.documentSentiment;
    const sentences = result.sentences;
    let response = {sentiment, sentences}
    res.status(200).send(response);
  });
};

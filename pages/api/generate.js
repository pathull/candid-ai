import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async function (req, res) {
  if (!OPENAI_API_KEY) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const question = req.body.question || '';
  if (question.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid question",
      }
    });
    return;
  }

  let totalApiCost = 0; // Track the total API usage cost

  if (totalApiCost >= 100) {
    res.status(402).json({
      error: {
        message: "API usage limit reached. Please contact the administrator.",
      }
    });
    return;
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a fact checker. Respond to user strictly with "True" or "False" or "I Don\'t Know."' },
          { role: 'user', content: question },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const completion = response.data.choices[0].message.content;

    // Calculate the API usage cost and update the total cost
    const tokensUsed = response.headers['x-usage-tokens'];
    const costPerToken = 0.06;
    const apiCost = (tokensUsed / 1000) * costPerToken;
    totalApiCost += apiCost;

    res.status(200).json({ result: completion });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}
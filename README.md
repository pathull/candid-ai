## Summary

Need a quick fact checker? Want to win (or lose) an arguement quickly? Or, just curious about AI's bottom-line on a topic? Look no further than Candid AI! There are only three possible answers: "True", "False", and "I Don't Know." This app is powered by OpenAI's text-davinci-003 model.


<div align="center" display="flex" flexDirection="column">
   
  <img width="300px" height="600px" src="https://github.com/pathull/candid-ai/assets/94504789/6852924c-6cf7-4fc1-a012-6351a0aec695.jpg" />

  <img width="300px" height="600px" src="https://github.com/pathull/candid-ai/assets/94504789/abe5ea52-3803-484f-8a2f-f0ca64b6a494.jpg" />

  <img width="300px" height="600px" src="https://github.com/pathull/candid-ai/assets/94504789/ceba62ca-22b4-458d-9bc1-53b7a77caf61.jpg" />
   
</div>

## Setup

1. If you don’t have Node.js installed, [install it from here](https://nodejs.org/en/) (Node.js version >= 14.6.0 required)

2. Clone this repository

3. Navigate into the project directory

   ```bash
   $ cd candid-ai
   ```

4. Install the requirements

   ```bash
   $ npm install
   ```

5. Make a copy of the example environment variables file

   On Linux systems: 
   ```bash
   $ cp .env.example .env
   ```
   On Windows:
   ```powershell
   $ copy .env.example .env
   ```
6. Add your [API key](https://platform.openai.com/account/api-keys) to the newly created `.env` file

7. Run the app

   ```bash
   $ npm run dev
   ```

You should now be able to access the app at [http://localhost:3000](http://localhost:3000)

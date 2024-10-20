const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process"); // Import exec to run the Python script
const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost:3000"],
};

const app = express();
const PORT = 8080;

app.use(cors(corsOptions));
app.use(bodyParser.json()); // Parse JSON bodies

// Handle the form submission
app.post("/predict", (req, res) => {
  const userInput = req.body;

  console.log("Received user input:", userInput);

  const inputString = `${userInput.Income} ${userInput.Age} ${userInput.Shared_Capital} ${userInput.Loan_Balance} ${userInput.num_loans} ${userInput.LoanAmount} ${userInput.num_paid_loans} ${userInput.num_defaulted_loans} ${userInput.num_active_loans}`;

  exec(
    `python src/backend/app.py ${inputString}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: "An error occurred while processing your request." });
      }
      if (stderr) {
        console.error(`Error: ${stderr}`);
        return res.status(500).json({ error: "An error occurred in the Python script." });
      }

      try {
        const result = JSON.parse(stdout.trim());  // Trim any whitespace before parsing
        res.status(200).json(result);
        console.log("Prediction result gggsgg:", result);
      } catch (parseError) {
        console.error("Error parsing Python output:", parseError);
        console.error("Raw output:", stdout);  // Log the raw output for debugging
        res.status(500).json({ error: "Error parsing prediction result." });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

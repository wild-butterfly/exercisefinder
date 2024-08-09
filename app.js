const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/exercises", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/exercises", async (req, res) => {
  try {
    const { name, muscle } = req.body;

    console.log("Received request with body:", req.body);

    if (!name || !muscle) {
      console.log("Missing parameters:", { name, muscle });
      return res
        .status(400)
        .json({ error: "Missing required body parameters: name, muscle" });
    }

    const response = await axios.get(
      "https://api.api-ninjas.com/v1/exercises",
      {
        headers: {
          "X-Api-Key": API_KEY,
        },
        params: {
          name: name,
          muscle: muscle,
        },
      }
    );

    console.log("API request params:", { name, muscle });
    console.log("API response data:", response.data);

    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching exercises data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

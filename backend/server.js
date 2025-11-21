const express = require("express");
const cors = require("cors");
const extractRoutes = require("./routes/extractRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/extract", extractRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

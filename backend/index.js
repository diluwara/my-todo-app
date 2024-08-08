const express = require("express");
const app = express();
const db = require("./config/db");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running and connected to the database!");
});

app.use("/api/auth", authRoutes);
app.use("/api", todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import cors from "cors";
import translateRouter from "./routes/translate.js";

const app = express();

app.use(cors());
app.use(express.json()); // VERY IMPORTANT
app.use("/api", translateRouter);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
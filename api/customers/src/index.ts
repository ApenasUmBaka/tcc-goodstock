// Libs
import Helmet from "helmet";
import Express from "express";

// Data
const PORT = process.env.PORT;
const app = Express();

// Code
app.use(Helmet());
app.set("trust proxy", true);

app.listen(PORT, () => {
  console.log(`The server is online on port: ${PORT}`);
});

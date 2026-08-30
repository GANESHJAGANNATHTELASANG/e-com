import app from "./app.js";

app.listen(process.env.PORT, () => {
  console.log("the backend is running", process.env.PORT);
});

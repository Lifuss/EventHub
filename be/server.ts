import app from "./main";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const { MONGO_USERNAME, MONGO_PASSWORD, DB_CLUSTER, DB_NAME, PORT } =
  process.env;

const port = typeof PORT === "number" ? PORT : 3030;

export const dbUri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${DB_CLUSTER}.ptjlibm.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(dbUri)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on ${port} port.`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

// import mongoose from "mongoose";

// const connectDB = () => {
//   mongoose
//     .connect(
//       "mongodb+srv://rajat_03:hashtag2001@backend.8ygd85r.mongodb.net/",
//       {
//         dbName: "nodeApi",
//       }
//     )
//     .then(() => {
//       console.log("DB CONNECTED ");
//     })
//     .catch((e) => console.log(e));
// };
// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "todoProject",
    });
    console.log("DB CONNECTED SUCCESS");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;

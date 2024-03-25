import mongoose from 'mongoose';

export const connectToMongoDB = () => {
  mongoose
    .connect(
      process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017/oauth'
    )
    .then(() => {
      console.log('Connected to mongodb successfully');
    })
    .catch((error) => console.log(error));
};

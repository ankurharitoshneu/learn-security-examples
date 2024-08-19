import express, { Request, Response } from 'express';
import mongoose, { Schema, Document, Model } from 'mongoose';

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/infodisclosure')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define an interface for the User document
interface IUser extends Document {
  username: string;
  password: string;
}

// Define a Mongoose schema
const userSchema: Schema<IUser> = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Create a Mongoose model based on the schema
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

// Route to authenticate user (VULNERABLE TO NOSQL INJECTION)
app.get('/userinfo', async (req: Request, res: Response) => {
  const { id } = req.query;

  // Ensure `id` is a string
  if (typeof id !== 'string') {
    return res.status(400).send('Invalid ID format');
  }

  try {
    // Perform database query using sanitized ID
    const user = await User.findOne({ _id: id }).exec();

    if (user) {
      res.send(`User: ${user}`);
    } else {
      res.status(401).send('User not found');
    }
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).send('Internal server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
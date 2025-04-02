import mongoose, { connect } from 'mongoose';
import dotenv from "dotenv";

dotenv.config({
  path: "./.env"
})

export class Database {
  private static instance: Database;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<void> {
    try {
      const uri = process.env.DATABASE_URL;
      
      if (!uri) {
        throw new Error('DATABASE_URL is not defined in environment variables');
      }

      await mongoose.connect(uri);
      
      console.log('Successfully connected to MongoDB');

      mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
      });

      mongoose.connection.on('disconnected', () => {
        console.warn('MongoDB connection disconnected');
      });

    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

}

const startServer = async () => {
  try {
    const db = Database.getInstance();
    await db.connect();

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

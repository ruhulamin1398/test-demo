import mongoose from "mongoose";

declare global {
  namespace NodeJS {
    interface Global {
      mongoose: {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Connection> | null;
      };
    }
    interface GlobalThis {
      [key: string]: unknown;
    }
  }
}

// This is necessary to ensure TypeScript knows about the augmentation
export {};

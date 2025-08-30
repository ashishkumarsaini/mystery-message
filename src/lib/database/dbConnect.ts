import mongoose from "mongoose";

type ConnectionObject = {
    isConnection?: number
}

const connection: ConnectionObject = {};

const dbConnect = async (): Promise<void> => {
    if (connection.isConnection) {
        console.log('Already connected to database');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '');
        connection.isConnection = db.connections[0].readyState;

        console.log('DB connected Successfully');
    } catch (error) {
        console.log('Database connection failed', error);
        process.exit();
    }
}

export { dbConnect };
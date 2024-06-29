import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import Routes from './routes/Routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use('/', Routes);

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions);
        console.log('Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to the database', error);
        process.exit(1);
    }
};

startServer();

export default app;

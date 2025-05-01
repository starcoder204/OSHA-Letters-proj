import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Letter from './models/letter.mjs';


const uri = process.env.MONGODB_URI;  // Use the MongoDB URI from the .env file

console.log("Starting the Lambda function...");

export const handler = async (event) => {
    try {

        console.log("Connecting to MongoDB...");
        
        // Step 1: Connect to MongoDB Atlas
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Successfully connected to MongoDB Atlas');

        // Step 2: Fetch letters from MongoDB
        const letters = await Letter.find({}).sort({ publicationDate: -1 }).limit(10);

        // Step 3: Return the data to API Gateway
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Successfully retrieved OSHA letters',
                data: letters,
            }),
        };
    } catch (error) {
        console.error('Error fetching letters from MongoDB:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error fetching OSHA letters',
                error: error.message,
            }),
        };
    } finally {
        // Step 4: Close the MongoDB connection
        mongoose.connection.close();
    }
};

// Manually invoke the handler with a mock event
const mockEvent = {};  // Replace with the actual event structure if needed
handler(mockEvent).then((response) => {
    console.log("Lambda function response:", response);
}).catch(error => {
    console.error("Error in Lambda function:", error);
});

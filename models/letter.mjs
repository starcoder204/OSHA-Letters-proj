import mongoose from 'mongoose';

const letterSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    publicationDate: { type: Date, required: true },
}, { timestamps: true });

const Letter = mongoose.model('Letter', letterSchema);

export default Letter;

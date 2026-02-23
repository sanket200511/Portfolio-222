import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Skill from './models/Skill.js';
import connectDB from './config/db.js';

dotenv.config();

const cleanSkills = async () => {
    try {
        await connectDB();
        console.log("Connected to DB. Deleting specific skills...");

        const result = await Skill.deleteMany({
            name: { $in: ['Three.js', 'Cyber Defense'] }
        });

        console.log(`Deleted ${result.deletedCount} skills.`);
        process.exit();
    } catch (err) {
        console.error("Error cleaning skills:", err);
        process.exit(1);
    }
};

cleanSkills();

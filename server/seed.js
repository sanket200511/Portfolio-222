import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import Skill from './models/Skill.js';
import connectDB from './config/db.js';

dotenv.config();

const projects = [
    {
        title: 'ShieldCall',
        subtitle: 'Real-time Voice Fraud Detection',
        description: 'An AI-powered application designed to detect and alert users about potential voice fraud in real-time. Built with a robust Python/FastAPI backend and a React frontend.',
        techStack: ['Python', 'FastAPI', 'React', 'TensorFlow', 'WebRTC'],
        category: 'AI/ML',
        threatLevel: 'CRITICAL',
        githubUrl: 'https://github.com/sanket200511/ShieldCall',
        color: '#ff0055',
        position: [3, 1, 2],
        order: 1
    },
    {
        title: 'CityWatch',
        subtitle: 'Urban Surveillance and Monitoring',
        description: 'A comprehensive monitoring system tailored for urban environments. It utilizes IoT sensors and edge computing to track and report city metrics anomalies.',
        techStack: ['Node.js', 'React', 'MongoDB', 'IoT', 'MQTT'],
        category: 'AI/ML',
        threatLevel: 'MODERATE',
        githubUrl: 'https://github.com/sanket200511/CityWatch',
        color: '#00f0ff',
        position: [-3, 2, -2],
        order: 2
    },
    {
        title: 'CrisisForge',
        subtitle: 'Disaster Response Drone System',
        description: 'A disaster management platform integrating autonomous drone mapping over affected areas to deliver critical real-time intel to ground teams.',
        techStack: ['C++', 'Python', 'React', 'ROS2'],
        category: 'Robotics',
        threatLevel: 'HIGH',
        githubUrl: 'https://github.com/sanket200511/CrisisForge',
        color: '#ffaa00',
        position: [0, 3, -4],
        order: 3
    },
    {
        title: 'Hajeeri',
        subtitle: 'AI-Powered Attendance Tracking',
        description: 'An advanced attendance tracking system leveraging facial recognition to automate employee and student check-ins with high precision.',
        techStack: ['Python', 'OpenCV', 'Express', 'React', 'PostgreSQL'],
        category: 'Full-Stack',
        threatLevel: 'LOW',
        githubUrl: 'https://github.com/sanket200511/Hajeeri',
        color: '#00ff88',
        position: [4, 0, -1],
        order: 4
    }
];

const skills = [
    { name: 'React.js', category: 'Frontend', proficiency: 95, order: 1 },
    { name: 'Node.js', category: 'Backend', proficiency: 90, order: 2 },
    { name: 'MongoDB', category: 'Database', proficiency: 88, order: 4 },
    { name: 'Python', category: 'Language', proficiency: 92, order: 5 },
    { name: 'FastAPI', category: 'Backend', proficiency: 85, order: 6 },
    { name: 'Express.js', category: 'Backend', proficiency: 90, order: 7 },
    { name: 'TailwindCSS', category: 'Frontend', proficiency: 95, order: 8 }
];

const seedData = async () => {
    try {
        await connectDB();

        await Project.deleteMany();
        await Skill.deleteMany();

        await Project.insertMany(projects);
        await Skill.insertMany(skills);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error with seed script: ${error}`);
        process.exit(1);
    }
};

seedData();

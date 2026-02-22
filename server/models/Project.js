import mongoose from 'mongoose';

const projectSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        subtitle: { type: String, required: false },
        description: { type: String, required: true },
        techStack: { type: [String], required: true },
        category: { type: String, required: true }, // "AI/ML", "IoT", "Robotics", "Full-Stack"
        threatLevel: { type: String, default: 'MODERATE' }, // Visual flair
        githubUrl: { type: String },
        liveUrl: { type: String },
        color: { type: String, required: true }, // Hex color for 3D node
        position: { type: [Number], required: true }, // [x, y, z] for 3D map
        order: { type: Number, default: 0 }
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;

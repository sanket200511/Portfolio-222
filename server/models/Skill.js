import mongoose from 'mongoose';

const skillSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        category: { type: String, required: true }, // "Frontend", "Backend", "Language", "Database", "Tool"
        proficiency: { type: Number, required: true, min: 0, max: 100 },
        order: { type: Number, default: 0 }
    },
    {
        timestamps: true,
    }
);

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;

import express from 'express';
import Skill from '../models/Skill.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
router.get('/', async (req, res) => {
    try {
        const skills = await Skill.find({}).sort('order');
        res.json(skills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc    Create a skill
// @route   POST /api/skills
// @access  Private (Admin)
router.post('/', protect, async (req, res) => {
    try {
        const skill = new Skill(req.body);
        const createdSkill = await skill.save();
        res.status(201).json(createdSkill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Private (Admin)
router.put('/:id', protect, async (req, res) => {
    try {
        const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSkill) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        res.json(updatedSkill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
    try {
        const skill = await Skill.findByIdAndDelete(req.params.id);
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        res.json({ message: 'Skill removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;

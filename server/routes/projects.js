import express from 'express';
import Project from '../models/Project.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find({}).sort('order');
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Private (Admin)
router.post('/', protect, async (req, res) => {
    try {
        const project = new Project(req.body);
        const createdProject = await project.save();
        res.status(201).json(createdProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
router.put('/:id', protect, async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;

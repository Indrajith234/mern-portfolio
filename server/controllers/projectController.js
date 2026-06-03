const Project = require('../models/Project');
const { cloudinary } = require('../config/cloudinary');

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const { title, description, techStack, liveUrl, githubUrl } = req.body;
    const imageUrl = req.file ? req.file.path : '';

    const project = new Project({
      title,
      description,
      techStack: techStack
        ? techStack.split(',').map((t) => t.trim()).filter(Boolean)
        : [],
      liveUrl: liveUrl || '',
      githubUrl: githubUrl || '',
      imageUrl,
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { title, description, techStack, liveUrl, githubUrl } = req.body;

    const updateData = {
      title,
      description,
      techStack: techStack
        ? techStack.split(',').map((t) => t.trim()).filter(Boolean)
        : [],
      liveUrl: liveUrl || '',
      githubUrl: githubUrl || '',
    };

    if (req.file) {
      updateData.imageUrl = req.file.path;
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.imageUrl && project.imageUrl.includes('cloudinary')) {
      try {
        const parts = project.imageUrl.split('/');
        const publicIdWithExt = parts.slice(-2).join('/');
        const publicId = publicIdWithExt.replace(/\.[^/.]+$/, '');
        await cloudinary.uploader.destroy(publicId);
      } catch (e) {
        console.error('Cloudinary delete error:', e.message);
      }
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllProjects, createProject, updateProject, deleteProject };

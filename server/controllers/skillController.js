const Skill = require('../models/Skill');

const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, order: 1, createdAt: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSkill = async (req, res) => {
  try {
    const { name, iconName, category } = req.body;
    if (!name || !iconName || !category) {
      return res
        .status(400)
        .json({ message: 'name, iconName and category are required' });
    }
    const skill = new Skill({ name, iconName, category });
    const savedSkill = await skill.save();
    res.status(201).json(savedSkill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSkills, createSkill, deleteSkill };

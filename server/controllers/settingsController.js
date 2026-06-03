const Settings = require('../models/Settings');

const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    const {
      heroName,
      heroTitle,
      heroBio,
      resumeUrl,
      githubUrl,
      linkedinUrl,
      contactEmail,
    } = req.body;

    const updateData = {};
    if (heroName) updateData.heroName = heroName;
    if (heroTitle) updateData.heroTitle = heroTitle;
    if (heroBio) updateData.heroBio = heroBio;
    if (resumeUrl) updateData.resumeUrl = resumeUrl;
    if (githubUrl) updateData.githubUrl = githubUrl;
    if (linkedinUrl) updateData.linkedinUrl = linkedinUrl;
    if (contactEmail) updateData.contactEmail = contactEmail;
    if (req.file) updateData.profileImageUrl = req.file.path;

    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(updateData);
    } else {
      settings = await Settings.findByIdAndUpdate(settings._id, updateData, {
        new: true,
      });
    }

    res.json(settings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getSettings, updateSettings };

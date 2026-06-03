const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    heroName: { type: String, default: 'Indrajith P' },
    heroTitle: { type: String, default: 'MERN Stack Developer' },
    heroBio: {
      type: String,
      default:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. I am a passionate full-stack developer who loves building modern web applications. Currently seeking exciting opportunities to contribute and grow.',
    },
    profileImageUrl: { type: String, default: '' },
    resumeUrl: {
      type: String,
      default:
        'https://drive.google.com/file/d/10jL8UcqXOou3hLbUSXM_1rwZfSk0PUb9/view?usp=drive_link',
    },
    githubUrl: { type: String, default: 'https://github.com/Indrajith234' },
    linkedinUrl: {
      type: String,
      default: 'https://www.linkedin.com/in/indrajithparthasarathy/',
    },
    contactEmail: {
      type: String,
      default: 'officiallyindrajith@gmail.com',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);

import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadPath = 'uploads/trip-voice-notes';

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, {
    recursive: true
  });
}

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {

    const fileName =
      `trip_${Date.now()}${path.extname(file.originalname)}`;

    cb(null, fileName);
  }

});

const fileFilter = (req, file, cb) => {

  const allowedTypes = [
    'audio/mpeg',
    'audio/mp3',
    'audio/wav',
    'audio/x-m4a',
    'audio/mp4'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only audio files allowed'));
  }

};

const uploadVoice = multer({
  storage,
  fileFilter
});

export default uploadVoice;
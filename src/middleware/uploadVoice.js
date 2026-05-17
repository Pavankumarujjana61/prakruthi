import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = 'uploads/voice-notes';

if (!fs.existsSync(uploadDir)) {

  fs.mkdirSync(uploadDir, {
    recursive: true
  });

}

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, uploadDir);

  },

  filename: (req, file, cb) => {

    const uniqueName =
      Date.now() +
      path.extname(file.originalname);

    cb(null, uniqueName);

  }

});

const uploadVoice = multer({
  storage
});

export default uploadVoice;
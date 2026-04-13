const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const createUploadDirs = () => {
  const dirs = ['uploads', 'uploads/documents', 'uploads/profile', 'uploads/food'];
  dirs.forEach(dir => {
    const dirPath = path.join(__dirname, '..', dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
};
createUploadDirs();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'profileImage') {
      cb(null, 'uploads/profile/');
    } else if (file.fieldname === 'foodImage') {
      cb(null, 'uploads/food/');
    } else {
      cb(null, 'uploads/documents/');
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

module.exports = upload;
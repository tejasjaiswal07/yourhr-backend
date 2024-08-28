const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { signUp, getAllUsers } = require('../controllers/userController');

const router = express.Router();


console.log('signUp:', signUp);
console.log('getAllUsers:', getAllUsers);





const uploadDir = path.join(__dirname, '../../uploads');

// upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });



router.post('/signup', upload.single('resume'), signUp);
router.get('/users', getAllUsers);

module.exports = router;
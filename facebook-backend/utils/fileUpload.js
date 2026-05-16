const multer = require('multer');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    }, 
    filename: (req, file, cb) => {
        const cleanDate = new Date().toISOString().replace(/:/g, '-');
        cb(null, cleanDate + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];

    if(allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: fileFilter
});

module.exports = upload;
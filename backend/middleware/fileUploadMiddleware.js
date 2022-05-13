import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const filesUpload = multer({
  storage: storage,
});

export { filesUpload };

require("dotenv").config();

const express = require("express");

const cors = require("cors");

const upload = require("./middleware/multer");

const cloudinary = require("./utils/cloudinary");

const app = express();
app.use(cors());
app.get("/", (req, res) => {
    res.send("Dang chay server");
});

app.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const file = req.file;
        const result = await cloudinary.uploader.upload_stream(
            {folder: "demo:"},
            (error, result) => {
                if (error) return res.status(500).json(error);
                res.json({url: result.secure_url,
                    
                });
            }
        );
        result.end(file.buffer);
    }catch (error) {
        res.status(500).json({error: error.message});
    }
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
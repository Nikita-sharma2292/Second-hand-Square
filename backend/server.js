const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
const cors = require('cors')
const wbm = require("./wbm/index");
const connectDB = require("./config/connectDB");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const {errorHandler} = require("./middlewares/errorMiddleware");

connectDB();

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded());
app.use('/static', express.static("public"))
app.use('/api', userRoutes);
app.use('/api', productRoutes); 
app.use(errorHandler);

let qrScanned = false;
let messageSent = false;

app.get("/api/chat/status", (req, res) => {
    res.json({ qrScanned, messageSent });
});

app.post("/api/chat", async (req, res) => {
    const { phone, msg } = req.body;

    qrScanned = false;
    messageSent = false;

    try {
        const qrCodeData = await wbm.start({ showBrowser: false, qrCodeData: true, session: false });
        res.json({ qrcode: qrCodeData });

        await wbm.waitQRCode(); 
        qrScanned = true;

        await wbm.sendTo([phone], msg);
        messageSent = true;

        await wbm.end();
        res.json({ message: "Message sent successfully!" });

    } catch (err) {
        console.error("Error:", err);
        if (!res.headersSent) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
});


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})
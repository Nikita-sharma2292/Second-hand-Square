const wbm = require("./wbm/index");
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer');
const bodyParser = require('body-parser')
var jwt = require('jsonwebtoken');
const port = 4000
const path = require('path');
require("dotenv").config();;
const app = express()
app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
 
app.post("/api", (req, res) => {
    const { phone, msg } = req.body;

    wbm
        .start({showBrowser: false, qrCodeData: true, session: false})
        .then(async (qrCodeData) => {
            console.log(qrCodeData); // show data used to generate QR Code
            res.send(qrCodeData);
            await wbm.waitQRCode();

            const phones = phone;
            const message = msg;
            console.log(phones, message);

            await wbm.sendTo(phones, message);
            await wbm.end();
        })
        .catch((err) => {
            console.log(err);
        });
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_PASSWORD)
        console.log("database is connected successfully!")
    }
    catch (err) {
        console.log(err)
    }
}
 
app.listen(port, () => {
    connectDB();
    console.log(`Example app listening on port ${port}`)
})


const Users = mongoose.model('Users', {
    username: String,
    email: String,
    phoneNo: Number,
    password: String,
    likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }]
});
const Products = mongoose.model('Products', { Brand: String, Year: String, Fuel: String, Transmission: String, KM: String, Owners: String, Title: String, Description: String, Price: String, Images: String, Category: String, SubCategory: String, Type: String, Bedrooms: String, Bathrooms: String, Furnishing: String, Status: String, ListedBy: String, BuiltUpArea: String, CarpetArea: String, Maintenance: String, TotalFloors: String, FloorNo: String, CarParking: String, Facing: String, ProjectName: String });

app.get('/', (req, res) => {
    res.send('hello...')
})

app.put('/Cart', (req, res) => {
    let productId = req.body.productId;
    let userId = req.body.userId;

    console.log(req.body)

    Users.updateOne({ _id: userId }, { $addToSet: { likedProducts: productId } })
        .then(() => {
            res.send({ message: "Liked success." })
        })
        .catch(() => {
            res.send({ message: "Server error" })
        })
})

app.post('/Cart/Delete', (req, res) => {
    let productId = req.body.productId;
    let userId = req.body.userId;
    console.log(req.body);

    Users.updateOne({ _id: userId }, { $pull: { likedProducts: productId } })
        .then(() => {
            res.send({ message: "Removed successfully." })
        })
        .catch(() => {
            res.send({ message: "Server error" })
        })
})

app.post('/signup', (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const email = req.body.email;
    const phoneNo = req.body.phoneNo;
    const password = req.body.password;  
    const user = new Users({ username: username, email: email, phoneNo: phoneNo, password: password });
    user.save()
        .then(() => {
            res.send({ message: "Saved success." })
        })
        .catch(() => {
            res.send({ message: "Server error" })
        })
})

app.post('/login', (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;

    Users.findOne({ username: username })
        .then((result) => {
            console.log(result);
            if (!result) {
                res.send({ message: "user not found" })
            } else {
                if (result.password == password) {
                    const token = jwt.sign({
                        data: result
                    }, 'MYKEY', { expiresIn: '1h' })
                    res.send({ message: "Find success", token: token, userId: result._id, phone: result.phoneNo })
                }
                if (result.password != password) {
                    res.send({ message: "password wrong" })
                }
            }
        })
        .catch(() => {
            res.send({ message: "Server error" })
        })
})

app.post('/User', (req, res) => {
    console.log(req.body);
    const userId = req.body.userId;

    Users.findOne({ _id: userId })
    .then((result) => {
        console.log(result);
        res.send({ message: "success", user: result })
    })
    .catch((err) => {
        res.send({ message: 'server error' })
    })
})

app.post('/addProduct/Cars/Cars', upload.single('Images'), (req, res) => {
    console.log(req.body);
    console.log(req.file.path);
    const Brand = req.body.Brand;
    const Year = req.body.Year;
    const Fuel = req.body.Fuel;
    const Transmission = req.body.Transmission;
    const KM = req.body.KM;
    const Owners = req.body.Owners;
    const Title = req.body.Title;
    const Description = req.body.Description;
    const Price = req.body.Price;
    const Images = req.file.path;
    const Category = req.body.Category;
    const SubCategory = req.body.SubCategory;
    const product = new Products({ Brand: Brand, Year: Year, Fuel: Fuel, Transmission: Transmission, KM: KM, Owners: Owners, Title: Title, Description: Description, Price: Price, Images: Images, Category: Category, SubCategory: SubCategory });
    product.save()
        .then(() => {
            res.send({ message: "save success." })
        })
        .catch(() => {
            res.send({ message: "server error." })
        })
})

app.post('/addProduct/Furniture/Sofa%20and%20Dining', upload.single('Images'), (req, res) => {
    console.log(req.body);
    console.log(req.file.path);
    const Title = req.body.Title;
    const Description = req.body.Description;
    const Price = req.body.Price;
    const Images = req.file.path;
    const Category = req.body.Category;
    const SubCategory = req.body.SubCategory;
    const product = new Products({ Title: Title, Description: Description, Price: Price, Images: Images, Category: Category, SubCategory: SubCategory });
    product.save()
        .then(() => {
            res.send({ message: "save success." })
        })
        .catch(() => {
            res.send({ message: "server error." })
        })
})

app.post('/addProduct/Mobiles/Mobile%20Phones', upload.single('Images'), (req, res) => {
    console.log(req.body);
    console.log(req.file.path);
    const Brand = req.body.Brand;
    const Title = req.body.Title;
    const Description = req.body.Description;
    const Price = req.body.Price;
    const Images = req.file.path;
    const Category = req.body.Category;
    const SubCategory = req.body.SubCategory;
    const product = new Products({ Brand: Brand, Title: Title, Description: Description, Price: Price, Images: Images, Category: Category, SubCategory: SubCategory });
    product.save()
        .then(() => {
            res.send({ message: "save success." })
        })
        .catch(() => {
            res.send({ message: "server error." })
        })
})

app.post('/addProduct/Electronics%20and%20Appliances/Tvs%20Video%20and%20Audio', upload.single('Images'), (req, res) => {
    console.log(req.body);
    console.log(req.file.path);
    const Title = req.body.Title;
    const Description = req.body.Description;
    const Price = req.body.Price;
    const Images = req.file.path;
    const Category = req.body.Category;
    const SubCategory = req.body.SubCategory;
    const product = new Products({ Title: Title, Description: Description, Price: Price, Images: Images, Category: Category, SubCategory: SubCategory });
    product.save()
        .then(() => {
            res.send({ message: "save success." })
        })
        .catch(() => {
            res.send({ message: "server error." })
        })
})

app.post('/addProduct/Electronics%20and%20Appliances/Tvs%20Video%20and%20Audio', upload.single('Images'), (req, res) => {
    console.log(req.body);
    console.log(req.file.path);
    const Brand = req.body.Brand;
    const Title = req.body.Title;
    const Description = req.body.Description;
    const Price = req.body.Price;
    const Images = req.file.path;
    const Category = req.body.Category;
    const SubCategory = req.body.SubCategory;
    const product = new Products({ Brand: Brand, Title: Title, Description: Description, Price: Price, Images: Images, Category: Category, SubCategory: SubCategory });
    product.save()
        .then(() => {
            res.send({ message: "save success." })
        })
        .catch(() => {
            res.send({ message: "server error." })
        })
})

app.post('/addProduct/Properties/For%20Sale%20Houses%20and%20Apartments', upload.single('Images'), (req, res) => {
    console.log(req.body);
    console.log(req.file.path);
    const Type = req.body.Type;
    const Bedrooms = req.body.Bedrooms;
    const Bathrooms = req.body.Bathrooms;
    const Furnishing = req.body.Furnishing;
    const Status = req.body.Status;
    const ListedBy = req.body.ListedBy;
    const BuiltUpArea = req.body.BuiltUpArea;
    const CarpetArea = req.body.CarpetArea;
    const Maintenance = req.body.Maintenance;
    const TotalFloors = req.body.TotalFloors;
    const FloorNo = req.body.FloorNo;
    const CarParking = req.body.CarParking;
    const Facing = req.body.Facing;
    const ProjectName = req.body.ProjectName;
    const Title = req.body.Title;
    const Description = req.body.Description;
    const Price = req.body.Price;
    const Images = req.file.path;
    const Category = req.body.Category;
    const SubCategory = req.body.SubCategory;
    const product = new Products({ Type: Type, Bedrooms: Bedrooms, Bathrooms: Bathrooms, Furnishing: Furnishing, Status: Status, ListedBy: ListedBy, BuiltUpArea: BuiltUpArea, CarpetArea: CarpetArea, Maintenance: Maintenance, TotalFloors: TotalFloors, FloorNo: FloorNo, CarParking: CarParking, Facing: Facing, ProjectName: ProjectName, Title: Title, Description: Description, Price: Price, Images: Images, Category: Category, SubCategory: SubCategory });
    product.save()
        .then(() => {
            res.send({ message: "save success." })
        })
        .catch(() => {
            res.send({ message: "server error." })
        })
})

app.get('/get-products', (req, res) => {
    Products.find()
        .then((result) => {
            console.log(result);
            res.send({ message: "success", products: result })
        })
        .catch((err) => {
            res.send({ message: 'server error' })
        })
})

app.get('/get-products/:id', (req, res) => {
    console.log(req.params);
    Products.findOne({ _id: req.params.id })
        .then((result) => {
            console.log(result);
            res.send({ message: "success", products: result })
        })
        .catch((err) => {
            res.send({ message: 'server error' })
        })
})

app.post('/Cart', (req, res) => {
    Users.find({ _id: req.body.userId }).populate('likedProducts')
        .then((result) => {
            console.log(result);
            res.send({ message: "success", products: result })
        })
        .catch((err) => {
            res.send({ message: 'server error' })
        })
})


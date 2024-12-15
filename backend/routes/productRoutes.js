const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
const upload = require('../middlewares/multer');
const {getAllProducts, CategoryProducts, ProductDetails, addProduct, addToCart, getMyAdds, deleteFromCart, getCart, deleteAdd} = require("../controllers/productController");

router.get('/', getAllProducts);
router.get('/category/:category/:subCategory', CategoryProducts);
router.get('/product-details/:id', ProductDetails);
router.post('/add/:category/:subCategory', upload.array('Images[]'), verifyJWT, addProduct);
router.post('/add-cart', verifyJWT, addToCart);
router.post('/delete-cart', verifyJWT, deleteFromCart);
router.get('/cart', verifyJWT, getCart);
router.post('/delete-add', verifyJWT, deleteAdd);

module.exports = router;
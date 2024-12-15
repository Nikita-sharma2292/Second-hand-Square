const User = require("../models/userModel");
const Product = require("../models/productModel");
const Apiresponse = require("../utilities/APIresponses");
const APIError = require("../utilities/APIerrorHandler");
const asyncHandler = require('express-async-handler')
const uploadOnCloudinary = require('../utilities/cloudinary');

const getAllProducts = asyncHandler(async (req, res)=>{
    const allProducts = await Product.find();
    if(!allProducts){
        res.status(500);
        throw new APIError(500, "Something went wrong while fetching the products.");
    }

    res.status(200).json(
        new Apiresponse(200, allProducts, "All products fetched.")
    )
})

const CategoryProducts = asyncHandler(async (req, res)=>{
    const {category} = req.params;
    const {subCategory} = req.params;

    const allProducts = await Product.find({'category': category, 'subCategory': subCategory});
    if(!allProducts){
        res.status(500);
        throw new APIError(500, "Something went wrong while fetching the products.");
    }

    res.status(200).json(
        new Apiresponse(200, allProducts, "All products fetched as per category.")
    )
})

const ProductDetails = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    
    const product = await Product.findById(id).populate('owner');
    if(!product){
        res.status(404);
        throw new APIError(404, "No such product exists");
    }

    res.status(200).json(
        new Apiresponse(200, product, "Product details fetched.")
    )
})

const addProduct = asyncHandler(async (req, res)=>{
    const user = req.user;
    const {category, subCategory, Brand, Year, Fuel, Transmission, KMdriven, NoOfOwners, Title, Description, Price, Type, BHK, Bathrooms, Furnishing, ProjectStatus, ListedBy, Area, Maintenance, Floors, FloorNo, CarParking, Facing, ProjectName, BachlelorsAllowed, Breadth, Length, Washrooms, MealsIncluded, PhysicalCondition, RAM, Storage, Network, Charger, Receipt, BoxWithIMEI, SalaryPeriod, Position, SalaryFrom, SalaryTo} 
        = req.body;
    const displayImage = req.files[0].path;

    if(!displayImage){
        res.status(500);
        throw new APIError(404, "Atleast one image is required.");
    }

    const urls=[];
    for(const file of req.files){
        urls.push(file.path);
    }
    const responseURLs = await uploadOnCloudinary(urls);

    const newProduct = await Product.create(
        {owner: user._id, Images: responseURLs, category, subCategory, Brand, Year, Fuel, Transmission, KMdriven, NoOfOwners, Title, Description, Price, Type, BHK, Bathrooms, Furnishing, ProjectStatus, ListedBy, Area, Maintenance, Floors, FloorNo, CarParking, Facing, ProjectName, BachlelorsAllowed, Breadth, Length, Washrooms, MealsIncluded, PhysicalCondition, RAM, Storage, Network, Charger, Receipt, BoxWithIMEI, SalaryPeriod, Position, SalaryFrom, SalaryTo}
    );

    if(!newProduct){
        res.status(500);
        throw new APIError(500, "Something went wrong while adding the product.");
    }

    const updatedUser = await User.updateOne({'_id': user.id}, {$push: {'posts': newProduct._id}});
    if(!updatedUser){
        res.status(500);
        throw new APIError(500, "Something went wrong while updating the user.");
    }

    res.status(200).json(
        new Apiresponse(200, newProduct, "Product added Successfully")
    )
})

const getCart = asyncHandler(async (req, res)=>{
    const user = req.user;

    const cartData = await User.findById(user.id).populate('cart');
    if(!cartData){
        res.status(500);
        throw new APIError(500, "Somehthing went wrong while fetching the cart.");
    }

    res.status(200).json(
        new Apiresponse(200, cartData.cart, "Cart fetched Successfully")
    )
})

const addToCart = asyncHandler(async (req, res)=>{
    const {id} = req.body;
    const user = req.user;

    const cartData = await User.findById(user.id);
    const isPresent = (cartData.cart && cartData.cart.includes(id));

    if(isPresent){
        throw new APIError(200, "Item already exists in cart");
    }
    
    const updatedUser = await User.updateOne({"_id": user.id}, {$push: {'cart': id}});
    if(!updatedUser){
        res.status(500);
        throw new APIError(500, "Something went wrong while updating the cart.");
    }

    res.status(200).json(
        new Apiresponse(200, updatedUser, "Item is added to cart.")
    )
})

const deleteFromCart = asyncHandler(async (req, res)=>{
    const {id} = req.body;
    const user = req.user;

    const response = await User.updateOne({'_id': user.id}, {$pull: {'cart': id}});
    if(!response){
        res.status(500);
        throw new APIError(500, "Something went wrong while updating the cart.");
    }

    const updatedCart = await User.findById(user.id).populate('cart');

    res.status(200).json(
        new Apiresponse(200, {'cart': updatedCart.cart, response}, "Item removed from cart successfully.")
    );
})

const deleteAdd = asyncHandler(async (req, res)=>{
    const user = req.user;
    const {id} = req.body;

    const deletedAdd = await Product.deleteOne({'_id': id});
    if(!deletedAdd){
        res.status(500);
        throw new APIError(500, "Something went wrong while deleting the add.");
    }

    res.status(200).json(
        new Apiresponse(200, deletedAdd, "Add deleted successfully.")
    );
})

module.exports = {getAllProducts, CategoryProducts, ProductDetails, addProduct, addToCart, deleteFromCart, getCart, deleteAdd};
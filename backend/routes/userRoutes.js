const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
const {registerUser, loginUser, getUsers, logoutUser, changeCurrentPassword, updateProfile, deleteAccount, getMyAdds} = require("../controllers/userController");

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', verifyJWT, logoutUser);
router.post('/change-password', verifyJWT, changeCurrentPassword);
router.post('/update-profile', verifyJWT, updateProfile);
router.get('/delete-account', verifyJWT, deleteAccount);
router.get('/my-adds', verifyJWT, getMyAdds);

module.exports = router; 
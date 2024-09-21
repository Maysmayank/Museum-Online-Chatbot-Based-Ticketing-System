
const express = require("express")
const router = express.Router()


const {
  login,
  signup,
  sendotp,
  logout,
  
} = require("../controllers/Auth")




router.post("/login", login)

router.post("/signup", signup)
router.post("/logout",logout)
router.post("/sendotp", sendotp)



module.exports = router

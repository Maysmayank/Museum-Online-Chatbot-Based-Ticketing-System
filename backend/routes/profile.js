
const express = require("express")
const router = express.Router()
const { auth, isInstructor } = require("../middleware/auth")
const {
  
  updateProfile,
 
  updateDisplayPicture,
  
} = require("../controllers/profile")


router.put("/updateProfile", auth, updateProfile)



router.put("/updateDisplayPicture", auth, updateDisplayPicture)


module.exports = router

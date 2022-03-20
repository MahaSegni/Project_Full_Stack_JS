const router = require('express').Router();
const userController = require('../controllers/userController')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,'D:/PiMern/Project_Full_Stack_JS/frontend/src/assets/uploads/user');
    },
    filename: function(req,file,cb) {
        cb(null, (Math.random() + 1).toString(36).substring(7)+file.originalname)
    } 
})
const upload = multer({storage:storage})

router.get("/check/:email",userController.checkMail);
router.post("/signup",userController.signUp);
router.post("/signin",userController.signIn);
router.get("/signout/:id",userController.signOut);
router.get("/coursepreferences/:id",userController.userCoursePreferences);
router.get("/removeCP/:id/:cp",userController.removeUserCoursePreferences);
router.post("/addCP",userController.addUserCoursePreferences);
router.put("/updateCP",userController.updateUserCoursePreferences);
router.put("/update",userController.updateUser);
router.put("/changePassword",userController.changePassword);
router.post("/changeEmail",userController.changeEmail);
router.put("/changeEmailAction",userController.changeEmailAction);
router.post("/deleteUser",userController.deleteUser);
router.get("/sendMail/:email",userController.sendMail);
router.put("/forgetPassword",userController.forgetPassword);
router.put("/uploadPicture/:id",upload.single('image'),userController.uploadPicture);
router.post("/googleLogin",userController.googleLogin);
//router.get("/checkIfGoogle/:email",userController.checkIfGoogle);
router.get("/getModulesByOwner/:id",userController.getModulesByOwner);
router.get("/getModulesBySubscriber/:id",userController.getModulesBySubscriber);
router.get("/allUsers/:id",userController.getAllUsers)
router.get("/ban/:aid/:id",userController.ban)
router.get("/unban/:aid/:id",userController.unban)
module.exports=router;
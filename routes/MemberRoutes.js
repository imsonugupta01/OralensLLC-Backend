const express = require('express');
const multer = require('multer');
const { createMember, getAllMembers, getMembersByTeam, login, FindMemberByID, uploadImage } = require('../controllers/MemberController');
const router = express.Router();


// const upload = multer({ dest: 'src/uploads/' });

router.post('/add', createMember);
// router.post('/upload/:id', upload.single('image'), uploadImage);
// router.get('/team/:teamId', getIndividualsByTeam);
// router.get('/all', getAllIndividuals);
router.get("/findAll",getAllMembers)
router.get("/find",getMembersByTeam)
router.post("/login",login)
router.get("/findById/:Id",FindMemberByID)
router.post('/upload/:Id',uploadImage)
module.exports = router;
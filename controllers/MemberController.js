
const Member= require("../models/Member")
const multer = require("multer");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { storage } = require("../firebase/firebaseConfig");
const path = require("path");
// const { response } = require("express");



const storageConfig = multer.memoryStorage(); 
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Only images (jpeg, jpg, png, gif) are allowed")); 
  }
};

const upload = multer({
  storage: storageConfig,
  fileFilter: fileFilter,
});




exports.createMember = [
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, email,teamId,password} = req.body;
      
      const file = req.file;
      console.log(req.body)
      

      const existingUser = await Member.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Member already exists' });
      }

    let imageUrl="";

     if(file){


      const storageRef = ref(storage, `tour-packages/${Date.now()}_${file.originalname}`);

     
      await uploadBytes(storageRef, file.buffer);

      
       imageUrl = await getDownloadURL(storageRef);

     }
     const member=new Member({name,email,teamId,imageUrl,password})
      await member.save();
      
      res.status(201).json({
        message: "Doctor created successfully",
      });
    } catch (error) {
      console.error("Error creating :", error);
      res.status(500).json({ message: "Server error" });
    }
  },
];



exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if the organization exists with the given email
    const member = await Member.findOne({ email });
    if (!member) {
      return res.status(404).json({ error: 'member not found' });
    }

    // 2. Check if the password matches
    if (member.password !== password) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // 3. Send the response with the organization info (no token involved)
    res.status(200).json({
      message: 'Login successful',
      member: {
        id: member._id,
        name: member.name,
        email: member.email,
        
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};





// Updated uploadImage controller
exports.uploadImage = [
  upload.single('image'),  // Expect the image file under 'image' key
  async (req, res) => {
    try {
      const { Id } = req.params;  // Get the member ID from the URL
      const file = req.file;  // Get the image file from the request
      console.log(req.file,req.params)
      if (!file) {
        return res.status(400).json({ error: 'No image file uploaded' });
      }

      const member = await Member.findById(Id);  // Find the member by ID
      console.log(member)
      if (!member) {
        return res.status(404).json({ error: 'Member not found' });
      }

      // Create a unique file path for Firebase Storage
      const storageRef = ref(storage, `members/${Date.now()}_${file.originalname}`);
      
      // Upload the image to Firebase Storage
      await uploadBytes(storageRef, file.buffer);

      // Get the image URL from Firebase Storage
      const imageUrl = await getDownloadURL(storageRef);
      console.log(imageUrl)
      // Update the member's profile image URL
      member.imageUrl = imageUrl;
      await member.save();

      // Return the updated member object
      res.json({
        message: 'Image uploaded successfully',
        member: {
          id: member._id,
          name: member.name,
          email: member.email,
          imageUrl: member.imageUrl,  // Return the updated image URL
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },
];


exports.getMembersByTeam = async (req, res) => {
  try {
    const members = await Member.find({ teamId: req.params.teamId });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllMembers = async (req, res) => {
  try {
    const Members = await Member.find();
    res.json(Members);
  } catch (err) {
    res.status(500).json({ error: "Error" });
  }
};



exports.getMembersByTeam = async (req, res) => {
  
  try {
    const teamMembersCount = await Member.aggregate([
      {
        $group: {
          _id: "$teamId",
          memberCount: { $sum: 1 },
        },
      },
      {
        $project: {
          teamId: "$_id",
          memberCount: 1,
          _id: 0,
        },
      },
    ]);

    res.json(teamMembersCount);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.FindMemberByID=async(req,res)=>{
  try {
    const{Id}=req.params
    const member=await Member.findById(Id)

    res.status(200).json(member)
  } catch (error) {
    res.status(500).json({message:"Member Not Exits"})
  }

}
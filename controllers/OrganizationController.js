const Organization = require('../models/Organization');




exports.createOrganization = async (req, res) => {
  try {

    const { name, email, location, password } = req.body;

   
    if (!name || !email || !location || !password) {
      return res.status(400).json({ error: 'All fields are required!' });
    }


    const existingOrg = await Organization.findOne({ email });
    if (existingOrg) {
      return res.status(400).json({ error: 'Organization with this email already exists' });
    }


    const org = new Organization({
      name,
      email,
      location,
      password,
    });
    await org.save();
    res.status(201).json({
      message: 'Organization registered successfully!',
      organization: org,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error" });
  }
};




exports.loginOrganization = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if the organization exists with the given email
    const organization = await Organization.findOne({ email });
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    // 2. Check if the password matches
    if (organization.password !== password) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // 3. Send the response with the organization info (no token involved)
    res.status(200).json({
      message: 'Login successful',
      organization: {
        id: organization._id,
        name: organization.name,
        email: organization.email,
        location: organization.location,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};



exports.getOrganizations = async (req, res) => {
    const{Id}=req.params;
  try {
    const organization = await Organization.findById(Id);
    res.json(organization);
  } catch (err) {
    res.status(500).json({ error:"Error" });
  }
};


exports.FindAllOrganization=async(req,res)=>{
    try {
        const Organizations= await Organization.find();
        res.status(200).json(Organizations)
    } catch (error) {
        res.status(500).json({message:"Errorn while fetching Organization"})
    }
}
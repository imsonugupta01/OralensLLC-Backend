const Team = require('../models/Team');

exports.createTeam = async (req, res) => {
  try {
    const {teamName,organizationId}=req.body;
    // console.log(req.body)
    console.log(teamName,organizationId)
    const team = new Team({teamName,organizationId});
    
    await team.save();
    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ error: "Error"});
  }
};

exports.getTeamsByOrganization = async (req, res) => {
  try {
    const {organizationId}=req.params
    const teams = await Team.find({ organizationId: organizationId });
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: "Error" });
  }
};

exports.getById=async(req,res)=>{
    try {
        const{organizationId}=req.params
        const team=await Team.findById(organizationId)
        res.status(200).json(team)
    } catch (error) {
        res.status(500).json({message:"no team found"})
        
    }
}
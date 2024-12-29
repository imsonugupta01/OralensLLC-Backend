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
    res.status(500).json({ error: err.message });
  }
};

exports.getTeamsByOrganization = async (req, res) => {
  try {
    const teams = await Team.find({ organizationId: req.params.organizationId });
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById=async(req,res)=>{
    try {
        const{Id}=req.params
        const team=await Team.findById(Id)
        res.status(200).json(team)
    } catch (error) {
        res.status(500).json({message:"no team found"})
        
    }
}
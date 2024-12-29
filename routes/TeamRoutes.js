const express = require('express');
const router = express.Router();
const { createTeam, getTeamsByOrganization, getById } = require('../controllers/TeamController');

router.post('/add', createTeam);
router.get('/get/:organizationId', getTeamsByOrganization);
router.get("/findById/:Id",getById)
module.exports = router;

const express = require('express');
const router = express.Router();
const { createOrganization, loginOrganization, getOrganizations, FindAllOrganization } = require('../controllers/OrganizationController');

router.post('/register', createOrganization);
router.post('/login', loginOrganization);
router.get("/getById/:Id",getOrganizations)
router.get("/findAll",FindAllOrganization)

module.exports = router;

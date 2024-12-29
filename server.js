const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const OrganizationRoutes =require("./routes/OrganizationRoutes")
const TeamRoutes=require('./routes/TeamRoutes')
const MemberRoutes =require("./routes/MemberRoutes")
dotenv.config();


connectDB();

const app = express();


app.use(cors());
app.use(express.json());
app.use("/organization",OrganizationRoutes)
app.use("/team",TeamRoutes)
app.use("/member",MemberRoutes)




// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

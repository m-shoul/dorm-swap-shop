// This file serves as an entry point for all the routers.
// Each individual router we have, we also want to include in here.

const express = require('express');
const app = express.Router();
const PORT = 6969;

// Import the routers. It is the filepath in OUR directory.
const userRoute = require('./routes/users'); 

// Use the routers. It is the path in the URL.
app.use('/dorm_swap_shop/users', userRoute);

// Export the main router that combines all the other routers.
module.exports = router;
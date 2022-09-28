const router = require('express').Router();
const User = require('../models/user');
const Points = require('../models/points');
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/verify-token')


//login
router.post('/login', async(req, res) => {
    let foundUser = await User.findOne({username: req.body.username});
    if(!foundUser) {
        res.status(403).json({
            success: false,
            message: "Login Failed"
        })
    } else {
        if(foundUser.comparePassword(req.body.password)){
            let token = jwt.sign(foundUser.toJSON(), 'super secret shit', {
                expiresIn: 604800
            }) 
            res.json({success: true, token: token})  
        } else {
            res.status(403).json({
                success: false,
                message: "Auth Failed"
            })
        }
        
    }
})

// Profile Route 
router.get("/auth/user", verifyToken, async(req, res) => {
    try {
        let foundUser = await User.findOne({_id: req.decoded._id}).exec();
        if (foundUser) {
            res.json({
                success: true,
                user: foundUser
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

//Route to sign up for the app
router.post('/auth/user/signup', async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.json({success: false, message: "Please enter email or password"});
    } else {
        try {
            let newUser = new User();
            newUser.username = req.body.username;
            newUser.password = req.body.password
            await newUser.save();
            let token = jwt.sign(newUser.toJSON(), 'super secret shit', {
                expiresIn: 604000 //1 Week
            })

            res.json({
                success: true,
                token: token,
                message: "Successfully created a new user"
            })
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
    }

})

//Getting Points
router.get('/points', async(req, res) => {
    const points = await Points.find().limit(1).exec();

    res.json({
        success: true,
        points: points
    })
});

//adding points 
router.post('/addpoint', async(req, res) => {
    let point = await Points.find().limit(1).exec();
    if(req.body.pointType === 'warzone') {
        point.warzone ++;
        await point.save();
        res.json({
            success: true,
            points: point
        })
    } else if(req.body.pointType === 'fallguys') {
        point.fallguys ++;
        await point.save();
        res.json({
            success: true,
            points: point
        })
    } else {
        res.json({
            success: false,
            message: "wrong inputs"
        })
    }
})

// router.post('/points', async(req, res) => {
//     let points = new Points();
//     points.warzone = 0;
//     points.fallguys = 0;
//     points.ID = 1;
//     await points.save()
//     res.json({
//         points: points
//     })
// })

module.exports = router;
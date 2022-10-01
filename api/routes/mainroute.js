const router = require('express').Router();
const User = require('../models/user');
const Points = require('../models/points');
const Seasons = require('../models/season');
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
    const points = await Points.find().limit(0).populate('warzone').populate('fallguys').exec();

    res.json({
        success: true,
        points: points
    })
});

//adding points 
router.post('/addpoint', async(req, res) => {
    let pointId = '63361e34c1b91fa00bae3115'
    let point = await Points.findById(pointId).populate('warzone').populate('fallguys').exec();
    let wins;
    if(req.body.pointType === 'warzone') {
        for(let warzoneseason of point.warzone) {
            if(warzoneseason.name === 'Fall, 2022') {
                warzoneseason.wins ++;
                wins = warzoneseason.wins;
                await warzoneseason.save()
            }
        }

        await point.save();
        res.json({
            success: true,
            points: point,
            wins: wins
        })
    } else if(req.body.pointType === 'fallguys') {
        for(let fallguysseason of point.fallguys) {
            if(fallguysseason.name === 'Fall Guys, 2022') {
                fallguysseason.wins ++;
                wins = fallguysseason.wins;
                await fallguysseason.save()
            }
        }
        await point.save();
        res.json({
            success: true,
            points: point,
            wins: wins
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
//     let fall2021 = new Seasons({
//         name: 'Fall, 2021',
//         wins: 63,
//         pointsId: points._id
//     })
//     let spring2022 = new Seasons({
//         name: 'Spring, 2022',
//         wins: 34,
//         pointsId: points._id
//     })
//     let fall2022 = new Seasons({
//         name: 'Fall, 2022',
//         wins: 9,
//         pointsId: points._id
//     })
//     let fallguys2022 = new Seasons({
//        name: 'Fall Guys, 2022',
//        wins: 8,
//        pointsId: points._id
//     })
//     await fall2021.save();
//     await spring2022.save();
//     await fall2022.save();
//     await fallguys2022.save();
//     points.warzone.push(fall2021);
//     points.warzone.push(spring2022);
//     points.warzone.push(fall2022);
//     points.fallguys.push(fallguys2022);
//     points.ID = 1;

//     await points.save()
//     res.json({
//         points: points
//     })
// })



module.exports = router;
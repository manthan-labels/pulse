const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("./usermodel");
const monitorModel = require("./monitormodel");
const fetchHistoryModel = require("./fetchrecordmodel");

app.use(cors({origin: "http://localhost:5173", credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));


async function checkMonitor(monitor_id) {
    // statuscode, latency, success, checked at
    
    const monitorData = await monitorModel.findOne({_id: monitor_id});
    console.log(monitorData);
    const monitorUrl = monitorData.url;

    const start = Date.now();
    const response = await fetch(monitorUrl);
    const latency = Date.now() - start;
    const success = response.status == monitorData.expectedStatusCode;

    await fetchHistoryModel.create({
        monitor_id,
        statusCode: response.status,
        latency,
        success,
        checkedAt: new Date()
    })

    return {
        statusCode: response.status,
        latency,
        success,
        checkedAt: new Date()
    };
};


function isLoggedIn (req, res, next) {
    const token = req.cookies.token;

    jwt.verify(token, "jwt-secret", function (err, decoded) {
        if (err) {
            return res.status(401).json({message: "Unauthorized"});
        }

        next();
    });
};

app.post("/register", function (req, res) {
    const userRegisterDataReceived = req.body;
    console.log(userRegisterDataReceived);

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(userRegisterDataReceived.password, salt, async function (err, hash) {
            await userModel.create({username: userRegisterDataReceived.username,
                  email: userRegisterDataReceived.email,
                  password: hash});
        });
    });

    res.json({message: "Received!"});
});

app.post("/login", async function (req, res) {
    const userLoginDataReceived = req.body;

    const userDetails = await userModel.findOne({username: userLoginDataReceived.username});

    bcrypt.compare(userLoginDataReceived.password, userDetails.password, function (err, result) {
        if (result) {
            console.log("Correct password, you may now log in.");
            let token = jwt.sign({user_id: userDetails._id}, "jwt-secret");
            res.cookie("token", token);
            res.json({message: "Request completed"});
        } else {
            console.log("Password is incorrect!");
        };
    });
});

app.get("/dashboard", isLoggedIn, async function (req, res) {
    let monitors = [];
    const loggedInUserData = jwt.verify(req.cookies.token, "jwt-secret");
    monitors = await monitorModel.find({user_id: loggedInUserData.user_id});
    res.json(monitors);
    console.log("Fetched monitors successfully!");
});

app.post("/dashboard/addMonitor", isLoggedIn, async function (req, res) {
    const monitorDataReceived = req.body;
    console.log(monitorDataReceived);

    const loggedInUserData = jwt.verify(req.cookies.token, "jwt-secret");
    console.log(loggedInUserData);
    // got the _id from userSchema DB

    await monitorModel.create({
        name: monitorDataReceived.name,
        user_id: loggedInUserData.user_id,
        url: monitorDataReceived.url,
        expectedStatusCode: monitorDataReceived.expectedStatusCode
    });
});

app.post("/dashboard/deleteMonitor/:monitorid", isLoggedIn, async function (req, res) {
    const monitorToDeleteDataReceived = req.body;
    console.log(monitorToDeleteDataReceived);

    await monitorModel.findOneAndDelete({
        _id: req.params.monitorid
    });

    res.json({message: "Monitor deleted successfully!"});
});

app.get("/dashboard/trackmonitor/:monitorid", isLoggedIn, async function (req, res) {
    console.log("Can track and analyze individual monitors here");
    console.log(req.params.monitorid);
    checkMonitor(req.params.monitorid).then(monitorStats => {
        res.json(monitorStats);
    });
});

app.get("/logout", function (req, res) {
    res.clearCookie("token");
    res.json({message: "Logged out"});
});

app.listen(3000, function (req, res) {
    console.log("Server started!");
});


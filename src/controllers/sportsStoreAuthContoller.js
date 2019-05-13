import jwt from 'jsonwebtoken';

function User(name, password) {
    this.username = name;
    this.password = password;
}
const APP_SECRET = "myappsecret";

//fake userss
let usersList = new Array(
    new User("admin", "secret"),
    new User("test", "test"));

// console.log(usersList);
let isUserExist = (name, pass) => usersList.some(u => u.username == name && u.password == pass);


export default function SportsStoreAuthContoller() {

    this.login = function (req, res, next) {
        if (req.body != null && isUserExist(req.body.username, req.body.password)) {
            let token = jwt.sign({ data: req.body.username, expiresIn: "1h" }, APP_SECRET);
            res.json({ success: true, access_token: token });
            //console.log(token);
        } else {
            res.json({ success: false });
        }
        res.end();
        // next();       
    };

    this.authenticate = function (req, res, next) {
        let token = req.headers["authorization"];
        //console.log(token);
        if (token != null && token.startsWith("Bearer")) {
            token = token.substring(7, token.length);
            //console.log(token);
            try {
                jwt.verify(token, APP_SECRET);
                next();
                return;
            } catch (err) {
                //console.log(err);
            }
        }
       // res.status(401).json({ message: 'invalid token...' });
        res.statusCode = 401;
        res.end();
    }
}
import bcrypt from "bcrypt";
import User from '../models/user.js'
import jwt from "jsonwebtoken"
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// import twilio from "twilio";
// // const client = twilio(accountSid, authToken);

export default class auth {

    // test api
    static testApi = async (req, res) => {
        try {
            res.status(202).json({ message: "Welcome to test api" });
        } catch (error) {
            res.status(404).json({ message: "problem" });
        }
    }

    //new user create
    static signUp = async (req, res) => {
        try {
            let newUserModel = new User(req.body);
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUserModel.password, salt, async (err, hash) => {
                    newUserModel.password = hash;
                    try {
                        await newUserModel.save()
                        res.status(201).json({ message: 'SignUp Successfully' })
                    } catch (error) {
                        res.status(401).json({ message: error })
                    }
                })
            })
        } catch (error) {
            res.status(401).json({ message: error })
        }
    }

    //sign in user
    static signIn = async (req, res) => {
        try {
            let userData = await User.findOne({ email: req.body.email })
            if (userData === null)
                res.status(404).json({ message: 'User not Found' })
            else {
                bcrypt.compare(req.body.password, userData.password, (err, result) => {
                    if (result) {
                        const token = jwt.sign({
                            email: userData.email,
                            role: userData.role,
                            userName: userData.userName
                        }, 'jwtTokenSecret', { expiresIn: '30min' })
                        res.status(200).json({ message: 'Logged in Successfully', token: token })
                    } else
                        res.status(401).json({ message: 'Wrong password' })
                })
            }
        } catch (error) {
            res.status(404).json({ message: error })
        }
    }

    //change password 
    static ChangePassword = async (req, res) => {
        try {
            if (await User.findOne({ _id: req.params.id }) === null) {
                res.status(404).json({ message: 'User not Found' })
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, async (err, hash) => {
                        try {
                            req.body.password = hash;
                            await User.findByIdAndUpdate(
                                req.params.id, req.body, { new: false }
                            )
                            client.messages
                                .create({
                                    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
                                    from: '+15017122661',
                                    to: '+917003586099'
                                })
                                .then(message => console.log(message.sid));
                            res.status(200).json({ message: 'Password Change Successfully' })
                        } catch (error) {
                            res.status(401).json({ message: error })
                        }
                    })
                })
            }
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
}

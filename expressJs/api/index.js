import express from "express";
const router = express.Router();
import auth from "../api/routes/auth.js";
import isAuthenticated from "./middlewares/authentication.js";

router.get("/status", (req, res) => {
    res.status(200).send({ "message": "Server  is running..." })
})

router.get('/', auth.testApi);

// auth
router.post('/sign-up', auth.signUp)
router.post('/sign-in', auth.signIn)
router.patch('/change-password/:id', auth.ChangePassword)

router.use(isAuthenticated)

export default router;

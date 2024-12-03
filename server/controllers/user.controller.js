import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.model.js";
import { sendToken } from "../utils/features.js";
import bcrypt from "bcrypt";
import { ErrorHandler } from "../utils/utility.js";

//create a new user and save it to db and save in cookie
const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;

  console.log(req.body);

  const avatar = {
    public_id: "gdgf",
    url: "jhj",
  };

  const user = await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  });

  sendToken(res, user, 200, "user created");
};

//login user and save token in cookie
const login = TryCatch(async (req, res, next) => {
  
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");

    if (!user) {
        return next(new ErrorHandler("invalid credentials", 404));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorHandler("invalid credentials", 404));
    }

    sendToken(res, user, 200, `welcome back, ${user.name}`);

}) 

const getMyProfile = TryCatch(async(req, res , next) => {

    const user = await User.findById(req.user).select("-password")

    res.status(200).json({
        success: true,
        user,
    })
})

export { login, newUser, getMyProfile };

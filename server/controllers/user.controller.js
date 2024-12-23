import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.model.js";
import { sendToken, cookieOptions } from "../utils/features.js";
import bcrypt from "bcrypt";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.model.js";


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

const getMyProfile = TryCatch(async(req, res) => {

    const user = await User.findById(req.user).select("-password")

    res.status(200).json({
        success: true,
        user,
    })
})


const logout = TryCatch(async(req, res) => {

    res
    .status(200)
    .cookie("chatapp-token", "",{...cookieOptions, maxAge: 0})
    .json({
        success: true,
        message: "user logged out successfully"
    })
})

const searchUser = TryCatch(async(req, res) => {

  const {name} = req.query

  //finding all my chats
  const myChats = await Chat.find({ groupChat: false, members: req.user})

  //extracting all users from my chat means friends or people i have chatted with 
  const allUsersFromMyChats = myChats.flatMap((chat) => chat.members)

  //finding all users except me and myfriends
  const allUsersExceptMeAndFriends = await User.find({
    _id: { $nin: allUsersFromMyChats},
     name: {$regex: name, $options: "i"},

  })  

  //modify the response
  const users = allUsersExceptMeAndFriends.map((_id, name, avatar) => ({
    _id,name,
    avatar: avatar.url,
  }))


  return res
  .status(200)
  .json({
      success: true,
      users,
  })
} )

export { login, newUser, getMyProfile, logout, searchUser };

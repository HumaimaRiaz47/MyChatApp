import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.model.js";
import {Chat} from "../models/chat.model.js"
import { Message } from "../models/message.model.js";
import { ErrorHandler } from "../utils/utility.js";
import jwt from "jsonwebtoken"
import { cookieOptions } from "../utils/features.js";

const adminLogin = TryCatch( async (req, res, next) => {
    const { secretKey } = req.body;

    const adminSecretKey = process.env.ADMIN_SECRET_KEY || "chatapp"

    const isMatched = secretKey === adminSecretKey

    if(isMatched) return next(new ErrorHandler("Invalid Admin key", 401))

    const token = jwt.sign(secretKey, process.env.JWT_SECRET)

    return res.status(200).cookie("chatapp-admin-token", token, {...cookieOptions, maxAge: 1000*60*15,

    }).json({
        success: true,
        message: "Authenticate successfully, Welcome! "
    })
})

const allUsers = TryCatch(async (req, res) => {
  const users = await User.find({});

  //here we directly use async inside map which return an empty array of promises
  // and does not wait for the data to fetch thats why we need to use await to make sure 
  //only send data when response is ready and promise.all helps us to wait for the async 
  //operations.


  // Use Promise.all to handle asynchronous operations for all users concurrently
const transformedUsers = await Promise.all(
    users.map(async ({ name, username, avatar, _id }) => {
      // For each user, perform two database operations concurrently using Promise.all:
      // 1. Count the number of group chats the user is a member of
      // 2. Count the number of individual (friends) chats the user is a member of
      const [groups, friends] = await Promise.all([
        Chat.countDocuments({ groupChat: true, members: _id }), // Group chats count
        Chat.countDocuments({ groupChat: false, members: _id }), // Friends chats count
      ]);
  
      // Return an object with the user's information and the counts of groups and friends
      return {
        name,       // User's name
        username,   // User's username
        avatar: avatar.url,  // Avatar URL of the user
        _id,        // User's unique ID
        groups,     // Number of group chats the user is in
        friends,    // Number of friends chats (individual chats) the user is in
      };
    })
  ); // End of Promise.all - waits for all users to be processed
  
  // Return a response with a success status and the transformed user data
  return res.status(200).json({
    status: "success",      // Status of the operation
    users: transformedUsers, // The array of transformed user objects
  });
})

// Define a function to handle all chat retrieval and transformation
const allChats = TryCatch(async (req, res) => {
  
    // Fetch all chats from the Chat collection
    const chats = await Chat.find({})
        .populate("members", "name, avatar")  // Populate members' name and avatar
        .populate("creator", "name, avatar"); // Populate creator's name and avatar

    // Use Promise.all to process each chat asynchronously and transform data
    const transformedChats = await Promise.all(
        chats.map(async ({ name, _id, groupChat, creator, members }) => {

            // Count the total number of messages in the current chat
            const totalMessages = await Message.countDocuments({ chat: _id });

            // Return the transformed chat data with additional details
            return {
                name, // The chat's name
                _id, // The chat's unique identifier
                groupChat, // Boolean indicating if it's a group chat
                avatar: members.slice(0, 3).map((member) => member.avatar.url), // Get avatars of the first 3 members
                members: members.map(({ _id, name, avatar }) => ({
                    _id, // Member's unique identifier
                    name, // Member's name
                    avatar: avatar.url, // Member's avatar URL
                })),
                creator: {
                    name: creator?.name || "None", // The creator's name (or "None" if not available)
                    avatar: creator?.avatar.url || "", // The creator's avatar URL (or empty string if not available)
                },
                totalMembers: members.length, // Total number of members in the chat
                totalMessages, // Total number of messages in the chat
            };
        })
    );

    // Return the response with the transformed chats data
    return res.status(200).json({
        success: true, // Indicates that the operation was successful
        chats: transformedChats, // The transformed chats data
    });
});


const allMessages = TryCatch(async (req, res) => {
    const messages = await Message.find({})
        .populate("sender", "name avatar" )
        .populate("chat", "groupChat")
    

    const tranformedMessages = messages.map(({_id, content, attachments, sender, chat, createdAt}) => ({
        _id,
        attachments,
        content,
        createdAt,
        chat: chat._id,
        groupChat:chat.groupChat,
        sender: {
            _id: sender._id,
            name: sender.name,
            avatar: sender.avatar.url,
        }
    }))


    return res.status(200).json({
        success: true,
        messages,
    })

})

const getDashboardStats = TryCatch(async (req, res) => {

    // Fetch counts for group chats, users, total messages, and total chats concurrently using Promise.all
    const [groupsCount, usersCount, messagesCount, totalChatCount] = await Promise.all([
        Chat.countDocuments({groupChat: true}),  // Count the number of group chats
        User.countDocuments(),  // Count the number of users
        Message.countDocuments(),  // Count the total number of messages
        Chat.countDocuments(),  // Count the total number of chats (could be group chats or other types)
    ]);

    const today = new Date();  // Get today's date

    const last7Days = new Date();  // Create a date object for the last 7 days
    last7Days.setDate(last7Days.getDate() - 7);  // Subtract 7 days from today's date to get the date 7 days ago

    // Query the database to fetch messages created in the last 7 days
    const last7DaysMessages = await Message.find({
        createdAt: {
            $gte: last7Days,  // Start from 7 days ago
            $lte: today,  // End at today's date
        },
    }).select("createdAt");  // Select only the 'createdAt' field for each message

    // Initialize an array to store the number of messages for each day in the last 7 days (starting with 0 messages for each day)
    const messages = new Array(7).fill(0);

    // Define the number of milliseconds in one day
    const dayInMiliSeconds = 1000 * 60 * 60 * 24;

    // Iterate over each message in the last 7 days
    last7DaysMessages.forEach((message) => {
        // Calculate the approximate index of the message based on how many days ago it was created
        const indexApprox = (today.getTime() - message.createdAt.getTime()) / dayInMiliSeconds;
        const index = Math.floor(indexApprox);  // Round down to the nearest integer to get the correct index

        // Increment the message count for the corresponding day (6 - index because we want the most recent day first)
        messages[6 - index]++;
    });

    // Prepare the final statistics object to return
    const stats = {
        groupsCount,  // Total number of group chats
        usersCount,  // Total number of users
        messagesCount,  // Total number of messages
        totalChatCount,  // Total number of chats (including group and possibly other types of chats)
        messagesChart: messages,  // Array representing the number of messages for each of the last 7 days
    };

    // Send the statistics as a JSON response with a success flag
    return res.status(200).json({
        success: true,
        stats,
    });
});




export { allUsers, allChats, allMessages, getDashboardStats, adminLogin }

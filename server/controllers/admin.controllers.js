import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.model.js";

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





export { allUsers }

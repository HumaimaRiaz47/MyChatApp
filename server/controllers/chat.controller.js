import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import {Chat} from "../models/chat.model.js"
import { emitEvent } from "../utils/features.js";
import { ALERT, REFETCH_CHATS } from "../constants/event.js";
import { getOtherMember } from "../lib/helper.js";
import { User } from "../models/user.model.js";



const newGroupChat = TryCatch(async(req, res, next) => {
    const {name, members} = req.body;

    if(members.length < 2){
        return next( new ErrorHandler("group must have 3 members", 400))
    }

    const allMembers = [...members, req.user]

    await Chat.create({
        name,
        groupChat: true,
        creator: req.user,
        members: allMembers,
    })

    emitEvent(req, ALERT, allMembers, `welcome to ${name} group chat`)
    emitEvent(req, REFETCH_CHATS, members)

    return res.status(200).json({
        success: true,
        message: "group created",
    })

})

const getMyChats = TryCatch(async (req, res, next) => {

    const chats = await Chat.find({ members: req.user })
      .populate(
        "members", //populate will give the entire document of chat we use comma to mark what we want name and avatar only
        "name avatar"
      );
  
    const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
  
      const otherMember = getOtherMember(members, req.user);
  
      return {
        _id,
        groupChat,
        avatar: groupChat
          ? members.slice(0, 3).map(({ avatar }) => avatar && avatar.url ? avatar.url : null) // Add a check here to ensure avatar exists before accessing the url.
          : (otherMember.avatar && otherMember.avatar.url) || null, // Same check for single member.
        name: groupChat ? name : otherMember.name,
        members: members.reduce((prev, curr) => {
            if(curr._id.toString() !== req.user.toString()){
                prev.push(curr._id)
            }
            return prev;
        }, []),
      };
    });
  
    return res.status(200).json({
      success: true,
      chats: transformedChats,
    });
  
  });
  
const getMyGroups = TryCatch(async (req, res, next) => {

    const chats = await Chat.find({
        members: req.user,
        groupChat: true,
        creator: req.user, 
    }).populate("members", "name avatar")

    const groups = chats.map(({members, _id, groupChat, name}) => ({
    _id,
    groupChat,
    name,
    avatar: members.slice(0,3).map(({avatar}) => avatar.url),
    }))

    return res.status(200).json({
        success: true,
        groups,
    })

})

const addMembers = TryCatch(async (req, res, next) => {

    const {chatId, members} = req.body

    if(!members || members.length < 1) return next(new ErrorHandler("please provide members", 400))

    const chat = await Chat.findById(chatId)

    if(!chat) return next(new ErrorHandler("chat not found", 404))

    if (!chat.groupChat) return next(new ErrorHandler("this is not a group chat", 404))

    if(chat.creator.toString() !== req.user.toString())
        return next(new ErrorHandler("your are not allowed to add members", 403))

    const allNewMembersPromise = members.map((i) => User.findById(i, "name"))

    const allNewMembers = await Promise.all(allNewMembersPromise)

    chat.members.push(...allNewMembers.map((i) => i._id))

    if(chat.members.length > 100)
        return next(new ErrorHandler("group members limit reached", 400))

    await chat.save()

    const allUsersName = allNewMembers.map((i) => i.name).join(",")

    emitEvent(
        req,
        ALERT,
        chat.members,
        `${allUsersName} has been added in the group`
    );

    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({
        success: true,
        groups,
    })

})


export {newGroupChat, getMyChats, getMyGroups, addMembers}
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import {Chat} from "../models/chat.model.js"
import { emitEvent } from "../utils/features.js";
import { ALERT, REFETCH_CHATS } from "../constants/event.js";



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


export {newGroupChat}
import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model.js";
import { faker, simpleFaker } from "@faker-js/faker";

const createUser = async (numUser) => {
  try {
    const usersPromise = [];

    for (let i = 0; i < numUser; i++) {
      const tempUser = User.create({
        name: faker.person.fullName(),
        username: faker.internet.username(),
        bio: faker.lorem.sentence(10),
        password: "password",
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });
      usersPromise.push(tempUser);

      console.log("user created", numUser);
      await Promise.all(usersPromise);
      process.exit(1);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const createSingleChats = async (numChats) => {
  try {
    const users = await User.find().select("_id");

    const chatsPromise = [];

    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        chatsPromise.push(
          Chat.create({
            name: faker.lorem.words(2),
            members: [users[i], users[j]],
          })
        );
      }
    }

    await Promise.all(chatsPromise);
    console.log("chats created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const createGroupChats = async (numChats) => {
  try {
    const users = await User.find().select("_id");

    const chatsPromise = [];

    for (let i = 0; i < numChats; i++) {
      const numMembers = simpleFaker.number.int({ min: 3, max: users.length });
      const members = [];

      for (let i = 0; i < numMembers; i++) {
        const randomIndex = Math.floor(Math.random() * users.length);
        const randomUser = users[randomIndex];

        //ensure the same user is not added twice
        if (!members.includes(randomUser)) {
          members.push(randomUser);
        }
      }
      const chat = Chat.create({
        groupChat: true,
        name: faker.lorem.words(1),
        members,
        creator: members[0],
      });
      chatsPromise.push(chat);
    }

    await Promise.all(chatsPromise);

    console.log("chats created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const createMessages = async (numMessages) => {
    try {
        const users = await User.find().select("_id")
        const chats = await Chat.find().select("_id")

        const messagesPromise = []

        for(let i=0; i< numMessages; i++){
            const randomUser = users[Math.floor(Math.random()*users.length)]
            const randomChat = chats[Math.floor(Math.random()*chats.length)]

        }
    } catch (error) {
        
    }
}
export { createUser };

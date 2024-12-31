
export const sampleChats = [
    {
    avatar:["https://www.w3schools.com/howto/img_avatar.png"],
    name:"John Deee",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
},

{
    avatar:["https://www.w3schools.com/howto/img_avatar.png"],
    name:"John Doo",
    _id: "2",
    groupChat: true,
    members: ["1", "2"],
},
{
  avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
  name: "John Doe",
  _id: "3",
  groupChat: false,
  members: ["1", "2"],
},

{
  avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
  name: "John Boi",
  _id: "4",
  groupChat: true,
  members: ["1", "2"],
},
{
  avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
  name: "John Doe",
  _id: "5",
  groupChat: false,
  members: ["1", "2"],
},

{
  avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
  name: "John Boi",
  _id: "6",
  groupChat: true,
  members: ["1", "2"],
},
{
  avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
  name: "John Doe",
  _id: "7",
  groupChat: false,
  members: ["1", "2"],
},

{
  avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
  name: "John Boi",
  _id: "8",
  groupChat: true,
  members: ["1", "2"],
},
{
  avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
  name: "John Doe",
  _id: "9",
  groupChat: false,
  members: ["1", "2"],
},

{
  avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
  name: "John Boi",
  _id: "10",
  groupChat: true,
  members: ["1", "2"],
},
{
  avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
  name: "John Doe",
  _id: "11",
  groupChat: false,
  members: ["1", "2"],
},

{
  avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
  name: "John Boi",
  _id: "12",
  groupChat: true,
  members: ["1", "2"],
},
{
  avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
  name: "John Doe",
  _id: "13",
  groupChat: false,
  members: ["1", "2"],
},

{
  avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
  name: "John Boi",
  _id: "14",
  groupChat: true,
  members: ["1", "2"],
},
];


export const sampleUsers = [
    {
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      name: "Connie Tucker",
      _id: "1",
    },
    {
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      name: "Alina Aish",
      _id: "2",
    },
  ];
  
  export const sampleNotifications = [
    {
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Messy Cooper",
      },
      _id: "1",
    },
    {
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Mery Cooper",
      },
      _id: "2",
    },
    {
        sender: {
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
          name: "John Boi",
        },
        _id: "3",
      },
  ];

  export const sampleMessage = [
    {
      //Displays on left and is meant too communicate both files and message
      attachments: [
        {
          public_id: "asdsad 0",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "Aapke liye Message nhi hai",
      _id: "sfnsdjkfsdnfkjsbnd",
      sender: {
        _id: "user._id",
        name: "Chaman ",
      },
      chat: "chatId",
      createdAt: "2024-12-29T10:41:30.630Z",
    },
    {
      //Displys on left and is only meant to commute files
      attachments: [],
      content: "Aapke liye Message hai",
      _id: "sfnsdjkfsdnfkjsbndddddddddddddd",
      sender: {
        _id: "user._id",
        name: "Chaman ki chandni",
      },
      chat: "chatId",
      createdAt: "2024-12-29T10:41:30.630Z",
    },

    {
      //This one shows message on right hand and is meant too communicate both files and message

      attachments: [
        {
          public_id: "asdsad 2",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "Aapke liye Message hai",
      _id: "sfnsdjkfsdnfkjsbndssssssssssss",
      sender: {
        _id: "sdfsdfsdf",
        name: "Chaman ki chandni",
      },
      chat: "chatId",
      createdAt: "2024-12-29T10:41:30.630Z",
    },
  
    {
      //This one is only meant to commute files
      attachments: [
        {
          public_id: "asdsad 3",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "",
      _id: "sfnsdjkfsdnfkdddjsbnd",
      sender: {
        _id: "sdfsdfsdf",
        name: "Chaman ki chandni",
      },
      chat: "chatId",
      createdAt: "2024-12-29T10:41:30.630Z",
    },
  ];
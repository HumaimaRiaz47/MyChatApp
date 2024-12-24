import { body, check, validationResult, param } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);

  const errorMessage = errors
    .array()
    .map((error) => error.msg)
    .join(", ");
  console.log(errorMessage);

  console.log(errors);

  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessage, 400));
};

const registerValidator = () => [
  body("name", "please enter name").notEmpty(),
  body("username", "please enter username").notEmpty(),
  body("password", "please enter password").notEmpty(),
  body("bio", "please enter bio").notEmpty(),
  check("avatar").notEmpty().withMessage("please upload avatar"),
];

const loginValidator = () => [
  body("username", "please enter username").notEmpty(),
  body("password", "please enter password").notEmpty(),
];

const newGroupValidator = () => [
  body("name", "please enter name").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("please enter members")
    .isArray({ min: 2, max: 100 })
    .withMessage("members must be 2-100"),
];

const addMemberValidator = () => [
  body("chatId", "please enter chat id").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("please enter members")
    .isArray({ min: 1, max: 97 })
    .withMessage("members must be 1-97"),
];

const removeMemberValidator = () => [
  body("chatId", "please enter chat id").notEmpty(),
  body("userId", "please enter user id").notEmpty(),
];


const sendAttachmentsValidator = () => [
    body("chatId", "please enter chat id").notEmpty(),
    check("files")
    .notEmpty()
    .withMessage("please upload attachments") 
    .isArray({ min: 1, max: 5 })
    .withMessage("members must be 1-5"),

];

const chatIdValidator = () => [
    param("id", "please enter chat id").notEmpty(),
  ];

  const renameValidator = () => [
    param("id", "please enter chat id").notEmpty(),
    body("name", "please enter new name").notEmpty(),

  ];

  const sendRequestValidator = () => [
    body("userId", "please enter user ID").notEmpty(),

  ];

  const acceptRequestValidator = () => [
    body("requestId", "please enter request ID").notEmpty(),
    body("accept")
    .notEmpty()
    .withMessage("please add accept")
    .isBoolean()
    .withMessage("accept must be a boolean"),
  ];
  
  const adminLoginValidator = () => [
    body("secretKey", "please enter secret key").notEmpty(),
 
  ];
  

export {
  registerValidator,
  validateHandler,
  loginValidator,
  newGroupValidator,
  addMemberValidator,
  removeMemberValidator,
  sendAttachmentsValidator,
  chatIdValidator,
  renameValidator,
  sendRequestValidator,
  acceptRequestValidator,
  adminLoginValidator
};

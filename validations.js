import { body } from "express-validator"


export  const loginValidaton = [
    body("email", "Неверный формат почты").isEmail(),
    body("password", "Пароль должен быть минимум 5 символов").isLength({ min: 5 }),
   
]

export  const registerValidaton = [
    body("email", "Неверный формат почты").isEmail(),
    body("password", "Пароль должен быть минимум 5 символов").isLength({ min: 5 }),
    body("fullName", "Укажите имя").isLength({ min: 3 }),
    body("avatarUrl"," Неверная ссылка на аватарку").optional().isURL(),
]

export  const postCreateValidation = [
    body("title", "Введите заголоок").isLength({ min: 3 }),
    body("text", "Введите текст статьи").isLength({ min: 3}).isString(),
    body("tags", "Неверный формат тэгов (укажите массив)").optional().isString(),
    body("imageUrl"," Неверная ссылка на изоображение").optional().isString(),
]
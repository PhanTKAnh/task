import { Request, Response } from "express";
import { generateRandomString } from "../../../helpers/generate";
import User from "../models/user.model";
import md5 from "md5"

//[POST] /api/v1/users/register
export const register = async (req:Request, res: Response) => {

    req.body.password = md5(req.body.password);

    const existEmail = await User.findOne({
        email: req.body.email,
        deleted: false
    });

    if (existEmail) {
        res.json({
            code: 400,
            message: "Email đã tồn tại"
        });
    } else {

        const user = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            token: generateRandomString(20)
        });

        user.save();

        const token = user.token;
        res.cookie("token", token);

        res.json({
            code: 200,
            message: "Tạo tài  thành công! ",
            token: token
        });
    }
};
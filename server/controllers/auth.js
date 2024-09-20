import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import crypto from "crypto";
import { s3, bucketName} from "../index.js"
import {
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectsCommand,
  } from "@aws-sdk/client-s3";


// REGISTER USER
export const register = async (req, res) => {
    try{

      const randomImageName = (byte = 32) => crypto.randomBytes(byte).toString("hex"); 

      const imageName = randomImageName();

      const params = {
      Bucket: bucketName,
      Key: imageName, //req.file.originalname,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      
    };
    const command = new PutObjectCommand(params);

    await s3.send(command);

        const {
            firstName,
            lastName,
            email,
            password,
            friends,
            location,
            occupation,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath: `https://friendsvault.s3.us-east-2.amazonaws.com/${imageName}`,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random()*5),
            impressions: Math.floor(Math.random()*5),
        })
        
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// LOGGING IN
export const login = async (req, res) => {
    try{
        
        const { email, password } = req.body;
        const user = await User.findOne({email: email});
        if (!user) return res.status(400).json({msg: "User does not exist. "});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({msg:"Invalid Credentials "})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET); 
        delete user.password;
        res.status(200).json({token, user});

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
}
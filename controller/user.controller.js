import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.models'

export const register = async(req , res ) => {

    try {

        const {fullname , email , password , phoneNumber , role} = req.body;

    if(!fullname || !email || !password || !phoneNumber || !role)
    {
        return res.status(400).json({

            error : "All fields are required",
            success : false

        })
    }

    const ExistingUser = await User.findOne({email})

    if(ExistingUser)
    {
        return res.status(500).json({
            message : "User Already Exist",
            success : false
        })
    }

    const hashedPassword = bcrypt.hash(password , 10)

    const NewUser = await User.create({

        fullname,
        email,
        password : hashedPassword,
        phoneNumber,
        role,

    })

    const token = jwt.sign({
        id : NewUser._id
    } ,  
      process.env.JWT_SECRET
    )

     return res.status(200).json({
   
        message : "Account Created Successfully",
        token,
        FullName : NewUser.fullname,
        Email : NewUser.email,
        phoneNumber : NewUser.phoneNumber,
        Role : NewUser.role,
        success : true
     })
        
    } catch (error) {
        
        console.log("Error While Registering");

        return res.status(500).json({

            error : "Error While Registering",
            success : false

        })
        
    }
}

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.models.js'


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

    const hashedPassword = await bcrypt.hash(password , 10)

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
        Password : NewUser.password,
        success : true
     })
        
    } catch (error) {
        
        console.log("Error While Registering" , error);

        return res.status(500).json({

            error : "Error While Registering",
            success : false

        })
        
    }
}


//Login Section

export const Login = async(req , res) => {
      try {
        
        
    const {email , password , role} = req.body;

    if(!email || !password || !role)
    {
        return res.status(400).json({
            message : "Something went Wrong or Need To signin first",
            success : false
        })
    }

    let user = await User.findOne({ email })

    if(!user)
    {
        return res.status(400).json({
            message : "Incorrect Email",
            success : false
        })
    }


    const isMatchedPassword = await bcrypt.compare(password , user.password)

    if(!isMatchedPassword)
    {
        return res.status(400).json({
            message : "Icorrect Password",
            success : false
        })
    }

    if(role != user.role)
    {
        return res.status(400).json({
            message : "Incorrect Role",
            success : false
        })
    }

    //Generating token 1.payload

    const payload = {
        userId : user._id
    }

    const token = jwt.sign(payload , process.env.JWT_SECRET)


    user = {
        _id : user._id,
        FullName : user.fullname,
        Email : user.email,
        Role : user.role,
        phoneNumber : user.phoneNumber,
    }

    //storing token to cookie

    return res
    .status(200)
    .cookie("Token" , token , {

        maxAge : 1 * 24 * 60 * 60 * 1000 ,
        httpOnly: true,
        sameSite: "strict"

    })    
    .json({

        message : "Login Successfully Done",
        user,
        success : true
    })
      } catch (error) {
        
        console.log("Error While Login" , error);

        return res.status(400).json({
            message : "Error while Login",
            
            success : false
        })
        
      }
}

//Logout Section

export const Logout = async(req , res) => {

    try {
        return res.status(200)
    .cookie("token" , {
        maxAge : 0
    })
    .json({
        message : "Logged out Successfully",
        success : true
    })
    } catch (error) {
        console.log("Error while Logout");

        return res.status(400).json({
            
            message : "Error while Logout",
            success : false
        })
        
    }
}

export const updateProfile = async(req , res) => {

    try {
        
        const { email , fullname , phoneNumber , bio , skills , } = req.body;

        // cloudinary part will be come..!!!


        let skillsArray;

        if(skills)
        {
            skillsArray = skills.split(",")
        }

        const userId = req.id;

        let user = await User.findOne(userId)

        if(!user)
        {
            return res.status(400).json({

                message : "User Not Found",
                success : false
            })
        }

        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.profile.bio = bio;
        if(skills) user.profile.skills = skills;


        await user.save()

        user = {
            _id : user._id,
            fullname : user.fullname,
            email : user.email,
            phoneNumber : user.phoneNumber,
            role : user.role,
            profile : user.profile

        }

        return res.status(200).json({

            message : "Profile updated Successfully",
            user,
            success : true
        })
    } catch (error) {
        
        console.log("Error While Updating Profile" , error);

        return res.status(400).json({

            message : "Error While Updating Profile",
            success : false

        })
        
    }
}
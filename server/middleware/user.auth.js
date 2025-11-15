import jwt from 'jsonwebtoken'

const isAuthenticated = (req , res, next) => {

    try {
        
        const token = req?.cookies?.token;
          console.log("Token =>" , token);

          
        if(!token)
        {

            return res.status(400).json({
                message : "User Not Authenticated Well",
                success : false,
            })
        }

        const decode = jwt.verify(token , process.env.JWT_SECRET)

        console.log("DECODED DATA =>" , decode);

        if(!decode)
        {
            return res.status(400).json({

                message : "Token is not valid",
                success : false

            })
        }
        
        req.id = decode.userId;
        next()
    } catch (error) {
        
        return res.status(500).json({

            message : "Authentication Failed",
            success : false
        })
    }
}

export default isAuthenticated;
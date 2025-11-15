import Contact from "../models/contact.model.js"

export const PostContact = async(req , res) => {

    try {
        
        const {name , email , message} = req.body

        if(!name || !email || !message)
        {
             return res.status(401).json({
                message : "Some fields are missing",
                success : false
             })
        }

        const existingData = await Contact.create({
            email,
            name,
            message
        })

        // await existingData.save()

        return res.status(201).json({

            message : "Thank You For Showing Interest..!",
            success : true,
            existingData
        })
    } catch (error) {
        return res.status(404).json({
            message : "Error While Contacting",
            success : false
        })
    }
}


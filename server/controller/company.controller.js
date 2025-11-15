import { Company } from '../models/company.model.js'
import getDataUri from '../utils/DataUri.js';
import cloudinary from '../utils/Claudinary.js';

export const registerCompany = async(req , res) => {

    try {
        
        const { CompanyName } = req.body;

        if(!CompanyName)
        {
            return res.status(401).json({

                message : "Company Name is required",
                success : true

            })
        }
   
        console.log("Company Id =>" , req.id);
        
        console.log('Company Name =>' , CompanyName);
        
        //finding the companyName

        let company = await Company.findOne({ CompanyName : CompanyName})

        if(company)
        {
            return res.status(400).json({
                message : "You can not register a Company of Same type",
                success : false
            })
        }

        console.log("company =>" , company);
        

        //dont know some how we failed to find the Company name then create a new ComPany Name

       company = await Company.create({

        CompanyName : CompanyName,
        userId : req.id,

       })

       console.log("Company =>" , company.CompanyName);
       
       return res.status(200).json({

        message : "Comapny Registered Successfully..!",
        company ,
        success : true
       })
    } catch (error) {
         console.log("Error is Occured While Registering the Comapny", error);

         return res.status(500).json({

            message : "Error is Occured while Registering the Company",
            success : false
         })
    }

}

export const getCompany = async(req , res) => {

    try {
        
        const userId = req.id;//current user

        const companies = await Company.find({ userId });

        if(!companies)
        {
            return res.status(401).json({
                message : "Companies are not registered Yet",
                success : false
            })
        }

        return res.status(201).json({
            message : "Company Details",
            companies,
            success : true
        })

    } catch (error) {
        
        console.log("Error While Getting Details");
        return res.status(401).json({
            message : "Error While Getting Company Details",
            success : false
        })
        
    }
}

// get Company by its Id

export const getCompanyById = async(req , res) => {

    try {
        
        const companyId = req.params.id;
        const comapny = await Company.findById(companyId)
        
        if(!comapny)
        {
            return res.status(404).json({
                message : "Company Not Found",
                success : false
            })
        }

        return res.status(201).json({
            message : "Current Company Data id",
            comapny,
            success : true
        })

    } catch (error) {
        
        console.log("Error while Getting the companies by its id" , error);

        return res.status(500).json({

            message : "Error while Getting the companies by its id",
            success : false

        })
    }
}

//updating the company details by its id

export const updateCompany = async(req  , res) => {

    try {
        
        const { CompanyName , website , description , location} = req.body;


        console.log( CompanyName , website , description , location);
        
        //this part is leave to the cloudinary 
 
        const file = req.file;
        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
        const logo = cloudResponse.secure_url;


        const updatedData = { CompanyName , website , description , location ,logo }

        console.log(updatedData);
        
        const company = await Company.findByIdAndUpdate(req.params.id , updatedData , {new : true})

        if(!company)
        {
            return res.status(401).json({
                message : "Company Not Found",
                success : false
            })
        }

        return res.status(201).json({
            message : "Company Data Updated Successfully",
            company,
            success : true
        })

    } catch (error) {
     
        console.log('Error While Updating Company Data =>' , error);

        return res.status(500).json({
            message : "Error While Updating Company Data ",
            success : false
        })
        
    }
}
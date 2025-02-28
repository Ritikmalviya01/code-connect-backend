const validator = require('validator')


const validationSignUpData = (req) => {
    const { firstName , lastName , emailId } = req.body;

    if(!firstName || !lastName) {
        throw new Error("Name is not valid!");
    }
    // else if(validator.isEmail(emailId)) {
    //     throw new Error("FirstName should be 4-50 characters")
    }

    const validateEditProfileData = (req) => {
        const ALLOWED_UPDATES = [
            "firstName", "lastName", "photoUrl", "about", "gender", "age", "skills"
        ]
          
        const isEditAlowed = Object.keys(req.body).every((k) => 
            ALLOWED_UPDATES.includes(k)
        );
        return isEditAlowed
        }
    
    
   


module.exports ={
    validationSignUpData,
    validateEditProfileData
}
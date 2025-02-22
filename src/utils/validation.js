const validator = require('validator')


const validationSignUpData = (req) => {
    const { firstName , lastName , emailId } = req.body;

    if(!firstName || !lastName) {
        throw new Error("Name is not valid!");
    }
    // else if(validator.isEmail(emailId)) {
    //     throw new Error("FirstName should be 4-50 characters")
    }


module.exports ={
    validationSignUpData
}
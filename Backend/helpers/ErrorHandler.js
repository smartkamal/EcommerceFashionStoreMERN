"use strict";

//Get unique error name
const uniqueErrorMessage = error => {
    let output;
    try {
        let name = error.message.substring(
            error.message.lastIndexOf(".$") + 2,
            error.message.lastIndexOf("_1")
        );
        output =
            name.charAt(0).toUpperCase() +
            name.slice(1) +
            " already exists";
    } catch (ex) {
        output = "Unique field already exists";
    }

    return output;
};

//Get the error message from error object
exports.errorHandler = error => {
    let errorMessage = "";

    if (error.code) {
        switch (error.code) {
            case 11000:
            case 11001:
                errorMessage = uniqueErrorMessage(error); //Generates a unique message if above mentioned errors
                break;
            default:
                errorMessage = "Something went wrong";
        }
    } else {
        for (let errorName in error.errors) {
            //For any other message, grab the error and populate the errorMessage variable with that error
            if (error.errors[errorName].message)
                errorMessage = error.errors[errorName].message;
        }
    }

    return errorMessage;
};

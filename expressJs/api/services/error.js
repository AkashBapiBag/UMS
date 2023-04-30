import createError from "http-errors";

export default class error {
    static BadRequestError = (message = "Something Went Wrong!") => {
        return createError(400, message)
    }

    static AuthenticationError = (message = "Authentication Error!") => {
        return createError(401, message)
    }

    static ForbiddenError = (message = "You are not allowed to access this resource!") => {
        return createError(403, message)
    }

    static NotFoundError = (message = "Not Found!") => {
        return new createError(404, message)
    }
}
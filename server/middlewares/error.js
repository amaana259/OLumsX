// Defines middleware for handling errors in Express by setting default values for error messages and status codes, then responding with a JSON object containing these details.
export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
    return res.status(err.statusCode).json({ success: false, message: err.message });
};

// To eliminate repetitive try-catch blocks, a single tryCatch function was created, simplifying the wrapping process and enhancing code readability.
export const TryCatch = (func) => {
    return (req, res, next) => {
        return Promise.resolve(func(req, res, next)).catch(next);
    };
};
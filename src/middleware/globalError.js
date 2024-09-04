export const globalError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    if (process.env.MODE === 'production') {
        res.status(err.statusCode).json({
            err: err.message,
            status: err.status,
            message: err.message
        })
    }
    else {
        res.status(err.statusCode).json({
            err: err,
            stack: err.stack,
            status: err.status,
            message: err.message
        })
    }
}
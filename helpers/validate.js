var validation = {
    validateRequest(req, next, schema) {
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true // remove unknown props
        };
        const { error, value } = schema.validate(req.body, options);
        if (error) {
            next(JSON.stringify({ response: false, error: error.details.map(x => x.message).join(', '), errorCode: -6 }));
        } else {
            req.body = value;
            next();
        }
    }
};

module.exports = validation;
import { body, validationResult } from 'express-validator'

function problemValidationRules () {
    return [
        body('gameType')
            .isLength({ min: 1 })
            .withMessage("A game type must be selected"),
        body('title')
            .isLength({ min: 1 })
            .withMessage("Title cannot be empty")
            .isString(),
        body('language')
            .isLength({ min: 1 })
            .withMessage("Language cannot be empty")
            .isString(),
        body('theme')
            .isLength({ min: 1 })
            .withMessage("Theme cannot be empty")
            .isString(),
        body('description')
            .isLength({ min: 1 })
            .withMessage("Description cannot be empty")
            .isString(),
        body('initialCode')
            .isString(),
        body('mainCode')
            .isString(),
        body('workingSolution')
            .isLength({ min: 1 })
            .withMessage("Working solution cannot be empty")
            .isString(),  
        body('stdin')
            .isString(),
        body('expectedOutput')
            .isLength({ min: 1 })
            .withMessage("Expected output cannot be empty")
            .isString(),
    ]
}

function validateProblem(req, res, next){
    const errors = validationResult(req);
    if(errors.isEmpty())
        return next();
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));
    errors.array().map(err => console.log(err.path+ "  "+err.msg));

    return res.status(422).json({
        errors: extractedErrors,
    })
}

export default { problemValidationRules, validateProblem };
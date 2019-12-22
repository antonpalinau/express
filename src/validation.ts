import { NextFunction, Request, Response } from "express";
import { ObjectSchema, ValidationResult } from "@hapi/joi";

const normalizeErrors = (errors: object[]) => {
    const normilizedErrors = errors.map((error: any) => {
        const { path, message } = error;

        return { message, path };
    });

    return {
        normilizedErrors,
        status: "failed",
    };
};

export const validateSchema = (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const { error }: ValidationResult= schema.validate(req.body, {
        abortEarly: false,
        allowUnknown: false,
    });

    if (error && error.isJoi) {
        res.status(400).json(normalizeErrors(error.details));
    } else {
        next();
    }
};
import { NextFunction, Request, Response, Router } from "express";
import uuid from "uuid";
import { users } from "../../model/usersModel";
import { IUser } from "../../types";
import { schema } from "./users.post.put.schema";

const router = Router();

const normalizeErrors = (errors: any) => {
    const normilizedErrors = errors.map((error: any) => {
        const { path, message } = error;

        return { message, path };
    });

    return {
        normilizedErrors,
        status: "failed",
    };
};

const validateSchema = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    const { error = {} } = schema.validate(req.body, {
        abortEarly: false,
        allowUnknown: false,
    });

    if (error.isJoi) {
        res.status(400).json(normalizeErrors(error.details));
    } else {
        next();
    }
};

router.get("/", (req: Request, res: Response) => res.json(users));

router.get("/:id", (req: Request, res: Response) => {
    const user = users.filter((user) => user.id === req.params.id);
    if (user.length) {
        res.json(user);
    } else {
        res.json({ msg: "user not found" });
    }
});

router.post("/", validateSchema(schema), (req: Request, res: Response) => {
    const newUser: IUser = {
        age: req.body.age,
        id: uuid.v4(),
        isDeleted: false,
        login: req.body.login,
        password: req.body.password,
    };

    users.push(newUser);
    res.json({ msg: "new user is created", users });
});

router.put("/:id", validateSchema(schema), (req: Request, res: Response) => {
    const found = users.some((user) => user.id === req.params.id);

    if (found) {
        users.forEach((user) => {
            if (user.id === req.params.id) {
                user.login = req.body.login;
                user.password = req.body.password;
                user.age = req.body.age;

                res.json({ msg: `user with the id of ${req.params.id} was updated`, user });
            }
        });
    } else {
        res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
    }
});

router.delete("/:id", (req: Request, res: Response) => {
    const found = users.some((user) => user.id === req.params.id);

    if (found) {
        users.forEach((user) => {
            if (user.id === req.params.id) {
                // validation
                user.isDeleted = true;

                res.json({ msg: `user with the id of ${req.params.id} was softly deleted`, user });
            }
        });
    } else {
        res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
    }
});

export default router;

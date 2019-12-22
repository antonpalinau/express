import { Request, Response, Router } from "express";
import uuid from "uuid";
import { users } from "../../model/usersModel";
import { IUser } from "../../types";
import { validateSchema } from "../../validation";
import { schema } from "./users.post.put.schema";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => res.json(users));

router.get("/:id", (req: Request, res: Response) => {
    const foundUser: IUser[] = users.filter((user: IUser): boolean => user.id === req.params.id);

    if (foundUser.length) {
        return res.json(foundUser);
    }

    res.json({ msg: "User not found" });
});

router.post("/", validateSchema(schema), (req: Request, res: Response) => {
    const { login, password, age } = req.body;
    const newUser: IUser = {
        age,
        id: uuid.v4(),
        isDeleted: false,
        login,
        password,
    };

    users.push(newUser);
    res.json({ msg: "New user is created", users });
});

router.put("/:id", validateSchema(schema), (req: Request, res: Response) => {
    const id: string = req.params.id;
    const { login, password, age } = req.body;
    const found: boolean = users.some((user: IUser): boolean => user.id === id);

    if (found) {
        users.forEach((user: IUser) => {
            if (user.id === id) {
                user.login = login;
                user.password = password;
                user.age = age;

                return res.json({ msg: `User with the id of ${id} was updated`, user });
            }
        });
    }

    res.status(400).json({ msg: `No user with the id of ${id}` });
});

router.delete("/:id", (req: Request, res: Response) => {
    const id: string = req.params.id;
    const found: boolean = users.some((user: IUser): boolean => user.id === id);

    if (found) {
        users.forEach((user: IUser) => {
            if (user.id === id) {
                user.isDeleted = true;

                return res.json({ msg: `User with the id of ${id} was softly deleted`, user });
            }
        });
    }

    res.status(400).json({ msg: `No user with the id of ${id}` });
});

export default router;

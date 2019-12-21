import { Request, Response, Router } from "express";
import { users } from "../../model/usersModel";
import { IUser } from "../../types";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    const newUsers = users
        .filter((user) => user.login.includes(req.query.loginSubstring))
        .sort((user1: IUser, user2: IUser) => user1.login.localeCompare(user2.login))
        .slice(0, req.query.limit);

    res.json(newUsers);
});

export default router;

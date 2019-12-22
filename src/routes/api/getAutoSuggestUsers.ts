import { Request, Response, Router } from "express";
import { users } from "../../model/usersModel";
import { IUser } from "../../types";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
    const newUsers: IUser[] = users
        .filter((user: IUser): boolean => user.login.includes(req.query.loginSubstring))
        .sort((user1: IUser, user2: IUser): number => user1.login.localeCompare(user2.login))
        .slice(0, req.query.limit);

    res.json(newUsers);
});

export default router;

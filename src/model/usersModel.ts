import uuid from 'uuid';
import { IUser } from '../types';// eslint-disable-line

export const users: IUser[] = [
    {
        age: 25,
        id: uuid.v4(),
        isDeleted: false,
        login: 'Sergey',
        password: '123456'
    },
    {   age: 21,
        id: uuid.v4(),
        isDeleted: true,
        login: 'Lesha',
        password: '5672134dad'
    },
    {
        age: 23,
        id: uuid.v4(),
        isDeleted: false,
        login: 'Ksenia',
        password: 'qweerty'
    },
    {
        age: 28,
        id: uuid.v4(),
        isDeleted: false,
        login: 'Daria',
        password: 'poiuy878'
    },
    {
        age: 24,
        id: uuid.v4(),
        isDeleted: false,
        login: 'Ariana',
        password: '12qwerty3456'
    }
];

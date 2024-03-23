import { Request, Response } from 'express-serve-static-core';
import { CreateUserDTO } from '../dtos/CreateUser.dto';
import { CreateUserQueryParams } from '../types/query-params';
import { User } from '../types/response';

export const getUsers = (request: Request, response: Response) => {
  response.send([]);
};

export const getUserById = (request: Request, response: Response) => {
  response.send({});
};

export const createUser = (
  request: Request<any, any, CreateUserDTO, CreateUserQueryParams>,
  response: Response<User>
) => {
  response
    .status(201)
    .send({ id: 123, username: 'John', email: 'john@gmail.com' });
};

import { Request, Response } from 'express-serve-static-core';
import { CreateUserDTO } from '../dtos/CreateUser.dto';
import { CreateUserQueryParams } from '../interfaces/query-params';
import { UserType } from '../interfaces/response';
import GoogleUser from '../models/googleUser.model';
import User from '../models/user.model';

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find({});

  res.send(users);
};

export const getUserById = (req: Request, res: Response) => {
  res.send({});
};

export const createUser = (
  req: Request<any, any, CreateUserDTO, CreateUserQueryParams>,
  res: Response<UserType>
) => {
  res.status(201).send({ id: 123, username: 'John', email: 'john@gmail.com' });
};

export const deleteAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await User.deleteMany({});
    res
      .status(200)
      .send({ msg: `${result.deletedCount} users deleted successfully` });
  } catch (error) {
    console.log(error);
  }
};

export const getGoogleUsers = async (req: Request, res: Response) => {};

// Delete all the google users
export const deleteAllGoogleUsers = async (req: Request, res: Response) => {
  try {
    const result = await GoogleUser.deleteMany({});

    // Response if there were users to be deleted
    if (result.deletedCount) {
      return res.status(200).send({
        msg: `${result.deletedCount} user${
          result.deletedCount > 1 && 's'
        } deleted successfully`,
      });
    }

    return res.status(200).send({ msg: 'No user exist to be deleted.' });
  } catch (error) {
    console.log(error);
  }
};

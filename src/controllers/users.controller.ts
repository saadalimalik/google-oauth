import { Request, Response } from 'express-serve-static-core';
import { CreateUserDTO } from '../dtos/CreateUser.dto';
import { UserType } from '../interfaces/response';
import GoogleUser from '../models/googleUser.model';
import User from '../models/user.model';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (
  req: Request<any, any, CreateUserDTO>,
  res: Response<UserType>
) => {
  try {
    const userAlreadyExists = await User.findOne({ email: req.body.email });
    if (userAlreadyExists)
      return res
        .status(400)
        .send({ msg: 'User already exists on email' } as unknown as UserType);
  } catch (error) {
    console.log(error);
  }

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const result = await newUser.save();

    return res.status(201).send(result as UserType);
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await User.deleteMany({});

    // Response if there were users to be deleted
    if (result.deletedCount) {
      return res.status(200).send({
        msg: `${result.deletedCount} user${
          result.deletedCount > 1 ? 's' : ''
        } deleted successfully`,
      });
    }

    return res.status(200).send({ msg: 'No user exist to be deleted.' });
  } catch (error) {
    console.log(error);
  }
};

export const getGoogleUsers = async (req: Request, res: Response) => {
  try {
    const googleUsers = await GoogleUser.find({});

    return res.status(200).send(googleUsers);
  } catch (error) {
    console.log(error);
  }
};

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

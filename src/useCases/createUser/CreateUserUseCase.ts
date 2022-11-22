import { hash } from 'bcryptjs';
import { client } from '../../lib/client';

interface IUserRequest {
  name: string;
  password: string;
  email: string;
}

class CreateUserUseCase {
  async execute({ name, password, email}: IUserRequest) {
    const userAlreadyExists = await client.users.findUnique({
      where: {
        email
      }
    });

    if(userAlreadyExists) {
      throw new Error('User already exists!');
    }

    const passwordHash = await hash(password, 8);

    const user = await client.users.create({
      data: {
        name,
        email,
        password: passwordHash,
      }
    });

    return user;
  }
}

export { CreateUserUseCase };

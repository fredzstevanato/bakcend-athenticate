import { Request, Response } from 'express';
import { z } from 'zod';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response) {
    const authenticateUserBody = z.object({
      email: z.string(),
      password: z.string(),
      name: z.string(),
    });

    const { email, password, name } = authenticateUserBody.parse(request.body);

    const createUserUseCase = new CreateUserUseCase();

    const user = await createUserUseCase.execute({
      email,
      password,
      name
    });

    return response.json(user);
  }
}

export { CreateUserController };

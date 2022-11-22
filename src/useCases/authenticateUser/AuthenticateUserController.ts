import { Request, Response } from 'express';
import { z } from 'zod';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const authenticateUserBody = z.object({
      email: z.string(),
      password: z.string(),
    });

    const { email, password } = authenticateUserBody.parse(request.body);

    const authenticateUserUseCase = new AuthenticateUserUseCase();

    const token = await authenticateUserUseCase.execute({
      email, password
    });

    return response.json(token);
  }
}

export { AuthenticateUserController };

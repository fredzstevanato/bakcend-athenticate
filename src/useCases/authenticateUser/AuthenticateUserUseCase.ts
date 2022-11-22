import { compare } from 'bcryptjs';
import { client } from '../../lib/client';
import { GenerateRefreshToken } from '../../provider/GenerateRefreshToken';
import { GenerateTokenProvider } from '../../provider/GenerateTokenProvider';

interface IRequest {
  email: string,
  password: string,
}

class AuthenticateUserUseCase {
  async execute({ email, password }: IRequest) {
    const userAlreadyExists = await client.users.findUnique({
      where: {
        email
      }
    });

    if(!userAlreadyExists) {
      throw new Error('User or password incorrect!');
    }

    const passwordMatch = await compare(password, userAlreadyExists.password);

    if(!passwordMatch) {
      throw new Error('User or password incorrect!');
    }

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(userAlreadyExists.id);

    await client.refreshToken.deleteMany({
      where: {
        userId: userAlreadyExists.id
      }
    });

    const generateRefreshToken = new GenerateRefreshToken();
    const refreshToken = await generateRefreshToken.execute(userAlreadyExists.id);

    return { token, refreshToken };
  }
}

export { AuthenticateUserUseCase };

import { sign } from 'jsonwebtoken';



class GenerateTokenProvider {
  async execute(userId: string) {
    const SECRET = process.env.SECRET;

    const token = sign({ }, SECRET, {
      subject: userId,
      expiresIn: '15s'
    });

    return token;
  }
}

export { GenerateTokenProvider };

import Fastify from 'fastify';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

dotenv.config();

const server = Fastify({ logger: true });

const PORT = Number(process.env.PORT) || 3000;
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'default_access_secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'default_refresh_secret';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

server.get('/health', async () => {
  return { status: 'healthy', timestamp: new Date().toISOString() };
});

server.post('/api/v1/auth/login', async (request, reply) => {
  const result = LoginSchema.safeParse(request.body);

  if (!result.success) {
    return reply.status(400).send({ error: 'Payload inválido', issues: result.error.issues });
  }

  const { email } = result.data;
  const userId = 'usr_01h7abcde9912';
  const role = 'operator';

  const accessToken = jwt.sign({ sub: userId, email, role }, ACCESS_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ sub: userId }, REFRESH_SECRET, { expiresIn: '7d' });

  return reply.status(200).send({
    tokenType: 'Bearer',
    accessToken,
    refreshToken,
    expiresIn: 900,
  });
});

server.get('/api/v1/auth/verify', async (request, reply) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return reply.status(401).send({ valid: false, error: 'Token ausente ou malformatado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, ACCESS_SECRET);
    return reply.status(200).send({ valid: true, payload: decoded });
  } catch (err) {
    return reply.status(401).send({ valid: false, error: 'Token inválido ou expirado' });
  }
});

const start = async () => {
  try {
    await server.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();

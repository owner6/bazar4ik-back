import prisma from '../lib/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validateEmail, validatePassword } from '../utils/validators.js';
import { ValidationError, UnauthorizedError, ForbiddenError } from '../utils/errors.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const secret = process.env.SECRET_KEY;

// generate JWT
const generateAccessToken = (id, email, phone, role) => {
  const payload = { id, email, phone, role };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

class authController {
  registration = asyncHandler(async (req, res) => {
    const { email, phone, lastname, firstname, password } = req.body;

    // validations input data
    validateEmail(email);
    validatePassword(password);

    const hashedPassword = await bcrypt.hash(password, 10);

    // check users
    const candidate = await prisma.users.findFirst({ where: { email } });
    if (candidate) {
      throw new ValidationError('A user with this email already exists');
    }

    // create new user
    await prisma.users.create({
      data: {
        firstname,
        lastname,
        email,
        phone,
        password: hashedPassword,
        role: 'user',
      },
    });

    res.status(201).json({ message: 'User successfully registered' });
  });

  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    validateEmail(email);
    if (!password) {
      throw new ValidationError('Password is required');
    }

    const user = await prisma.users.findFirst({ where: { email } });
    if (!user) {
      throw new UnauthorizedError('Incorrect email or password');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedError('Incorrect email or password');
    }

    const token = generateAccessToken(user.id, user.email, user.phone, user.role);

    res.json({ message: 'Authentication successful', token });
  });

  getUsers = asyncHandler(async (req, res) => {
    const { role } = req.user;

    if (role !== 'admin') {
      throw new ForbiddenError('Permission denied: You are not an admin');
    }

    const users = await prisma.users.findMany();
    res.json(users);
  });
}

export default new authController();

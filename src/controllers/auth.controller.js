import prisma from '../lib/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const secret = process.env.SECRET_KEY;

const generateAccessToken = (id, email, phone, role) => {
  const payload = {
    id,
    email,
    phone,
    role
  }
  return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {
  async registration(req, res) {
    try {
      console.log('User registration started');

      const { email, firstname, lastname, phone, password } = req.body;

      if (password.length < 4 || password.length > 18) {
        throw new Error('Invalid email or password format');
      }
      
      if (!/@/.test(email)) {
        throw new Error('Invalid email or password format');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const candidate = await prisma.users.findFirst({ where: { email } });

      if (candidate) {
        console.log('User already exists');

        return res.status(500).json({ message: 'A user with the same username already exists' });
      }

      const newUser = await prisma.users.create({
        data: {
          firstname,
          lastname,
          email,
          phone,
          password: hashedPassword,
          role: 'user'
        }
      });

      console.log('User successfully registered')

      return res.json({ message: 'User successfully registered' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Error during registration' });
    }
  }

  async login(req, res) {
    try {
      const {email, password} = req.body;

      const user = await prisma.users.findFirst({ where: {email} });
      console.log(user)
      
      if (!user) {
        return res.status(401).json({message: 'Incorrect email or password'});
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
     
      if (!passwordMatch) {
        return res.status(401).json({message: 'Incorrect email or password'});
      }
    
      const token = generateAccessToken(user.id, user.email, user.phone, user.role)
      
      return res.json({ message: 'Authentication successful', token });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Login error' });
    }
  }

  async getUsers(req, res) {
    try {
      const { role } = req.user
      if (role !== 'admin') {
        return res.status(403).json({ message: 'Permission denied: You are not an admin' });
      }
      
      const users = await prisma.users.findMany();
      
      return res.json(users);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'getUsers error' });
    }
  }  
}

export default new authController();
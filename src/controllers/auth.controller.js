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
  
      const { email, phone, lastname, firstname, password } = req.body;
  
      // Basic email and password validation
      if (password.length < 4 || password.length > 18) {
        return res.status(400).json({ message: 'Password must be between 4 and 18 characters long' });
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Check if the user already exists
      const candidate = await prisma.users.findFirst({ where: { email } });
      if (candidate) {
        console.log('User already exists');
        return res.status(409).json({ message: 'A user with this email already exists' });
      }
  
      // Create new user
      const newUser = await prisma.users.create({
        data: {
          firstname,
          lastname,
          email,
          phone,
          password: hashedPassword,
          role: 'user',
        },
      });
  
      console.log('User successfully registered');
      return res.status(201).json({ message: 'User successfully registered' });
  
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
      if (role !== 'user') {
        return res.status(403).json({ message: 'Permission denied: You are not an admin' });
      }
      
      const users = await prisma.users.findMany();
      console.log(users)
      
      return res.json(users);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'getUsers error' });
    }
  }  
}

export default new authController();
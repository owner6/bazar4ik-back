import { ValidationError } from './errors.js';

export const validateRequiredFields = (data, fields) => {
  const missingFields = fields.filter(field => !data[field]);
  if (missingFields.length > 0) {
    throw new ValidationError(`Missing required fields: ${missingFields.join(', ')}`);
  }
};

export const validateEmail = (email) => {
  if (!email) {
    throw new ValidationError('Email is required');
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ValidationError('Invalid email format');
  }
};

export const validatePassword = (password) => {
  if (!password) {
    throw new ValidationError('Password is required');
  }
  if (password.length < 8) {
    throw new ValidationError('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    throw new ValidationError('Password must contain at least one uppercase letter');
  }
  if (!/[0-9]/.test(password)) {
    throw new ValidationError('Password must contain at least one number');
  }
};

export const validateListingData = ({ title, description, price, category, userId }) => {
  if (!title) {
    throw new ValidationError('Title is required');
  }
  if (typeof title !== 'string') {
    throw new ValidationError('Title must be a string');
  }
  if (title.length < 3) {
    throw new ValidationError('Title must be at least 3 characters long');
  }
  if (title.length > 100) {
    throw new ValidationError('Title must not exceed 100 characters');
  }

  if (!description) {
    throw new ValidationError('Description is required');
  }
  if (typeof description !== 'string') {
    throw new ValidationError('Description must be a string');
  }
  if (description.length < 4) {
    throw new ValidationError('Description must be at least 4 characters long');
  }
  if (description.length > 1000) {
    throw new ValidationError('Description must not exceed 1000 characters');
  }

  if (!price && price !== 0) { // Дозволяємо 0 як значення
    throw new ValidationError('Price is required');
  }
  if (typeof price !== 'number') {
    throw new ValidationError('Price must be a number');
  }
  if (price <= 0) {
    throw new ValidationError('Price must be greater than 0');
  }

  if (!category) {
    throw new ValidationError('Category is required');
  }
  if (typeof category !== 'string' || category.trim() === '') {
    throw new ValidationError('Category must be a non-empty string');
  }
  if (!userId) {
    throw new ValidationError('User ID is required');
  }
};

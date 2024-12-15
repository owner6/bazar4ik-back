import { ValidationError } from './errors.js';

export const validateRequiredFields = (data, fields) => {
  const missingFields = fields.filter(field => !data[field]);
  if (missingFields.length > 0) {
    throw new ValidationError(`Missing required fields: ${missingFields.join(', ')}`);
  }
};

export const validateUserId = (userId) => {
  if (!userId) {
    throw new ValidationError('User ID is required');
  }
};
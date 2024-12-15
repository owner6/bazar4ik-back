export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// 404 - Not Found Error - відсутні ресурси
export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

// 400 - Validation Error - неправильні вхідні дані
export class ValidationError extends AppError {
  constructor(message = 'Validation failed') {
    super(message, 400);
  }
}

// 403 - Forbidden Error - для авторизації
export class ForbiddenError extends AppError {
  constructor(message = 'Access forbidden') {
    super(message, 403);
  }
}

// 400 - Client Error - базовий клас для помилок на стороні клієнта
export class ClientError extends AppError {
  constructor(message = 'Client error occurred') {
    super(message, 400);
  }
}

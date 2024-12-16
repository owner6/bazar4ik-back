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

//помилка авторизації 401
export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized access') {
    super(message, 401);
  }
}

//конфлікт данних 409
export class ConflictError extends AppError {
  constructor(message = 'Conflict occurred') {
    super(message, 409);
  }
}

//помилка сервера 500
export class InternalServerError extends AppError {
  constructor(message = 'Internal server error') {
    super(message, 500);
  }
}

//сервер не доступний 503
export class ServiceUnavailableError extends AppError {
  constructor(message = 'Service unavailable') {
    super(message, 503);
  }
}

//некоректні дані 422
export class UnprocessableEntityError extends AppError {
  constructor(message = 'Unprocessable entity') {
    super(message, 422);
  }
}

//занадто багато запитів 429
export class TooManyRequestsError extends AppError {
  constructor(message = 'Too many requests') {
    super(message, 429);
  }
}

//непідтримуваний формат данних 415
export class UnsupportedMediaTypeError extends AppError {
  constructor(message = 'Unsupported media type') {
    super(message, 415);
  }
}

// час очікування запиту закінчився
export class RequestTimeoutError extends AppError {
  constructor(message = 'Request timeout') {
    super(message, 408);
  }
}

//некоректний токен доступу 401
export class InvalidTokenError extends AppError {
  constructor(message = 'Invalid or expired token') {
    super(message, 401);
  }
}

//помилка шлюзу 502
export class BadGatewayError extends AppError {
  constructor(message = 'Bad gateway') {
    super(message, 502);
  }
}

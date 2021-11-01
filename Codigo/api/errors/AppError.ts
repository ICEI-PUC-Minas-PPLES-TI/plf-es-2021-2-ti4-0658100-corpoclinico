export default class AppError {
  message: string;
  statusCode: number;
  error: any;

  // Erro que chegou
  constructor(message: string, statusCode = 400, error?: any) {
    this.message = message;
    this.statusCode = statusCode;
    this.error = error;
  }
};

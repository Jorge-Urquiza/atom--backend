export class ApiResponse {
  static success(data: any, message = 'Success') {
    return {
      status: 'success',
      message,
      data,
    };
  }

  static error(message: string, status = 'error') {
    return {
      status,
      message,
    };
  }
}
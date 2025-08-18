import { isAxiosError } from 'axios';

export const handleAxiosError = (
  error: unknown,
  defaultMessage: string,
): ApiError => {
  if (isAxiosError(error) && error.response) {
    const statusCode = error.response.status;
    const message = error.response.data?.status_message || defaultMessage;
    return new ApiError(message, statusCode);
  }
  return new ApiError(`Unexpected error: ${defaultMessage}`, 500);
};
export class ApiError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

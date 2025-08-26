export class HttpError extends Error {
      status: number;
      details?: unknown;
      constructor(status: number, message: string, details?: unknown) {
            super(message);
            this.status = status;
            this.details = details;
      }
}

export const BadRequest = (message: string, details?: unknown) => new HttpError(400, message, details);
export const Unauthorized = (message: string, details?: unknown) => new HttpError(401, message, details);
export const Forbidden = (message: string, details?: unknown) => new HttpError(403, message, details);
export const NotFound = (message: string, details?: unknown) => new HttpError(404, message, details);
export const MethodNotAllowed = (message: string, details?: unknown) => new HttpError(405, message, details);
export const InternalServerError = (message: string, details?: unknown) => new HttpError(500, message, details);
export const BadGateway = (message: string, details?: unknown) => new HttpError(502, message, details);
export const ServiceUnavailable = (message: string, details?: unknown) => new HttpError(503, message, details);
export const GatewayTimeout = (message: string, details?: unknown) => new HttpError(504, message, details);
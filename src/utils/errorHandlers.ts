// Error Handlers
// ========================================================
/**
 * Bad Request
 */
export class BadRequest extends Error {
  public httpStatusCode: number;

  constructor(message?: string) {
    super(message);
    this.httpStatusCode = 400;
    this.name = 'BadRequest';
  }
}

/**
 * Forbidden Request
 */
export class Forbidden extends Error {
  public httpStatusCode: number;

  constructor(message?: string) {
    super(message);
    this.httpStatusCode = 403;
    this.name = 'Forbidden';
  }
}

/**
 * NotFound Request
 */
export class NotFound extends Error {
  public httpStatusCode: number;

  constructor(message?: string) {
    super(message);
    this.httpStatusCode = 404;
    this.name = 'NotFound';
  }
}

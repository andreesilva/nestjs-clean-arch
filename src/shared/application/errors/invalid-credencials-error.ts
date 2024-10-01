export class InvalidCredencialsError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = 'InvalidCredencialsError';
  }
}

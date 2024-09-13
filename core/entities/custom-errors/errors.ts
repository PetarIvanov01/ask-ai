export class InputParseError extends Error {
  constructor(public message: string, public fields: Record<string, string[]>) {
    super(message);
  }
}
export class AuthenticationError extends Error {
  constructor(public message: string) {
    super(message);
  }
}

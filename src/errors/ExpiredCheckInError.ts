export class ExpiredCheckInError extends Error {
  constructor() {
    super('The check in can only be validated within 20 minutes after creation')
  }
}

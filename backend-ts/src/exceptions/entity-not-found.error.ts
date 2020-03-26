export class EntityNotFoundError extends Error {
  static create(message?: string): EntityNotFoundError {    
    return new EntityNotFoundError(message ? message : 'Entity not found exception');
  }
}
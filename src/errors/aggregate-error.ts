import BaseError from './base-error';

/**
 * A wrapper for multiple Errors
 *
 * @param errors The aggregated errors that occurred
 */
class AggregateError extends BaseError {
  /** the aggregated errors that occurred */
  readonly errors: Array<AggregateError | Error>;

  constructor(errors: Array<AggregateError | Error>) {
    super();
    this.errors = errors;
    this.name = 'AggregateError';
  }

  toString(): string {
    const message = `AggregateError of:\n${this.errors
      .map((error: Error | AggregateError) => (error === this
          ? '[Circular AggregateError]'
          : error instanceof AggregateError
            ? String(error).replace(/\n$/, '').replace(/^/gm, '  ')
            : String(error).replace(/^/gm, '    ').slice(2)))
      .join('\n')}\n`;

    return message;
  }
}

export default AggregateError;

import * as Sentry from '@sentry/nextjs';

/**
 * Logs an error message and details, and reports it to Sentry.
 *
 * @param {Object} params - The parameters for the logError function.
 * @param {string} params.message - The error message.
 * @param {Error} params.error - The error object.
 * @param {string} [params.level='error'] - The error level.
 * @param {Object} params.data - Additional data related to the error.
 */

type LogErrorParams = {
  message: string;
  error?: Error | null;
  level?: 'error' | 'warning' | 'info';
  data?: Record<string, unknown>;
};

export const logError = ({
  message,
  error = null,
  level = 'error',
  data = {},
}: LogErrorParams) => {
  if (!isValidErrorParams(message, error)) {
    console.error('Invalid parameters for logError');
    return;
  }

  const timestamp = new Date().toISOString();
  const errorData = { ...data, message };
  const dataString = formatErrorData(errorData);

  try {
    logToConsole(timestamp, message, dataString, error);
    reportToSentry(error, level, errorData);
  } catch (error) {
    console.error('Error logging error:', error);
  }
};

function isValidErrorParams(message: string, error: Error | null): boolean {
  return (
    typeof message === 'string' &&
    message.trim() !== '' &&
    error instanceof Error
  );
}

function formatErrorData(
  data: Record<string, unknown>
): string | Record<string, unknown> {
  return typeof data === 'object' && data !== null
    ? JSON.stringify({ ...data })
    : data;
}

function logToConsole(
  timestamp: string,
  message: string,
  errorData: string | Record<string, unknown>,
  error: Error | null
) {
  console.log(
    `${timestamp} - ${message} - ${JSON.stringify(errorData)} - ${
      error?.message ?? ''
    }`
  );
}

function reportToSentry(
  error: Error | null,
  level: 'error' | 'warning' | 'info',
  data: Record<string, unknown>
) {
  // Default to Error if level is not recognized
  console.log('reportToSentry', error, level, data);
  Sentry.setContext('context', data);
  Sentry.withScope((scope) => {
    scope.setLevel(level);

    Sentry.captureException(error);
  });
}

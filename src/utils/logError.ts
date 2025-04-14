/**
 * Logs an error message and details, and reports it to Sentry.
 *
 * @param {Object} params - The parameters for the logError function.
 * @param {string} params.message - The error message.
 * @param {Error} params.error - The error object.
 * @param {string} [params.level='error'] - The error level.
 * @param {Object} params.data - Additional data related to the error.
 */

import posthog from 'posthog-js';
import { toast } from '~/components/ui/use-toast';

type LogErrorParams = {
  message: string;
  error?: unknown;
  level?: 'error' | 'warning' | 'info';
  data?: Record<string, unknown>;
};

export const logError = ({
  message,
  error = null,
  level = 'error',
  data = {},
}: LogErrorParams) => {
  if (error instanceof Error) {
    if (!isValidErrorParams(message, error)) {
      console.error('Invalid parameters for logError');
      return;
    }

    const timestamp = new Date().toISOString();
    const errorData = { ...data, message };
    const dataString = formatErrorData(errorData);

    try {
      logToConsole(timestamp, message, dataString, error);
      toast({
        title:
          error instanceof Error ? error.message : 'Error sending payment link',
        variant: 'destructive',
        duration: 5000,
      });
      reportToPosthog({ error, context: { location: message } });
    } catch (error) {
      console.error('Error logging error:', error);
    }
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

function reportToPosthog({
  error,
  context,
}: {
  error: Error;
  context: Record<string, unknown>;
}) {
  posthog.captureException(error, context);
}

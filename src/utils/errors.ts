import { type NextApiResponse } from 'next';

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const reportError = ({
  message,
  res,
}: {
  message: string;
  res?: NextApiResponse | null;
}) => {
  console.error({ message });

  if (res) {
    res.status(422).send({ message });
  }
};

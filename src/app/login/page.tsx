import { signIn } from '~/server/auth';

export default function Login() {
  return signIn('google', { callbackUrl: '/admin' });
}

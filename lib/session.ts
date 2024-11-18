import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

interface SessionContent {
  id?: number;
}

export default async function getSession() {
  return await getIronSession<SessionContent>(await cookies(), {
    cookieName: 'carrot-session',
    password: process.env.COOKIE_PASSWORD!,
  });
}

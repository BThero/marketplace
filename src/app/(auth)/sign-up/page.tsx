import Link from 'next/link';

import { redirect } from 'next/navigation';
import { SignUpForm } from './SignUpForm';
import { getUser } from '@/lib/getUser';

export default async function Page() {
  const user = await getUser();
  if (user) {
    return redirect('/');
  }
  return (
    <div className="w-full flex-1 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="typography-h1">Checklists</h1>
        <h2 className="typography-h2">Sign Up</h2>
        <SignUpForm />
        <Link href="/login">
          <span className="typography-small">Already have an account?</span>
        </Link>
      </div>
    </div>
  );
}

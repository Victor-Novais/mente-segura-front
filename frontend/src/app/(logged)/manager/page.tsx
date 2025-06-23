'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ManagerRootPage() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {

    const showInvite = params.get('showInvite');
    if (showInvite === 'true') {
      router.replace('/manager/dashboard?showInvite=true');
    } else {
      router.replace('/manager/dashboard');
    }
  }, [params, router]);

  return null;
}

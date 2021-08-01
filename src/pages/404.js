import { useRouter } from 'next/router';

export default function NotFound() {
  const router = useRouter();
  const { asPath } = router;

  return <h1>404 - {asPath}</h1>;
}

import { redirect } from "next/navigation";
import { Layout } from '@/app/components/layouts/Layout'
import { ProtectedRouteWrapper } from '@/app/components/ProtectedRouteWrapper'
import { getUser } from '@/services/auth/auth.server';

const layout = async ({ children }) => {
  const user = await getUser();
  if (!user) redirect('/login');

  return (
    <ProtectedRouteWrapper>
      <Layout pageTitle="Dashboard">{children}</Layout>
    </ProtectedRouteWrapper>
  );
};

export default layout;

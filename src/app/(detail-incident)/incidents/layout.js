import { redirect } from "next/navigation";
import { ProtectedRouteWrapper } from '@/app/components/ProtectedRouteWrapper'
import { getUser } from '@/services/auth/auth.server';

export const metadata = {
  title: "Detalle de Incidente - Spybee",
};

const layout = async ({ children }) => {
  const user = await getUser();
  if (!user) redirect('/login');

  return (
    <ProtectedRouteWrapper>
      {children}
    </ProtectedRouteWrapper>
  );
};

export default layout;

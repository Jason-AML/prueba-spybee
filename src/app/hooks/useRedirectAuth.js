import {useAuth} from "../../context/AuthContext"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const useRedirectAuth = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) router.replace("/dashboard");
  }, [user, loading]);
};

export default useRedirectAuth;

"use client";

import { useEffect, useState } from "react";
import { useAddress } from "@chopinframework/react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user-store";
import { checkRegistration, registerUser, loginUser } from "@/api/auth.api";

export function useAuthCheck() {
  const { address, isLoading } = useAddress();
  const { setUser, name, surnames, username, email } = useUserStore();
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!address || isLoading) return;

    async function fetchRegistrationStatus() {
      const registered = await checkRegistration(address);
      setIsRegistered(registered);
      localStorage.setItem("isRegistered", JSON.stringify(registered));
    }

    fetchRegistrationStatus();
  }, [address, isLoading]);

  useEffect(() => {
    async function handleAuth() {
      if (!address || isLoading || isRegistered === null) return;

      if (!isRegistered) {
        if (!name || !surnames || !username || !email) {
          console.warn("Datos del usuario incompletos para el registro.");
          return;
        }

        const registered = await registerUser({
          name,
          surnames,
          email,
          username,
          walletAddress: address,
        });

        if (!registered) return;

        setIsRegistered(true);
        localStorage.setItem("isRegistered", JSON.stringify(true));
      }

      const loginData = await loginUser(email);
      if (!loginData) return;

      setUser({
        name: loginData.user?.name,
        surnames: loginData.user?.surnames,
        username: loginData.user?.username,
        email: loginData.user?.email,
      });
    }

    handleAuth();
  }, [address, isLoading, isRegistered, setUser, name, surnames, username, email]);

  return { isLoading, isRegistered };
}

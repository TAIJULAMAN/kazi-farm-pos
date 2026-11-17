"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { LoginView } from "@/components/layout/LoginView";

export default function LoginPage() {
  const { login } = useApp();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginEmail, loginPassword);
  };

  const handleQuickDemo = (email: string, pass: string) => {
    setLoginEmail(email);
    setLoginPassword(pass);
    login(email, pass);
  };

  return (
    <LoginView
      loginEmail={loginEmail}
      setLoginEmail={setLoginEmail}
      loginPassword={loginPassword}
      setLoginPassword={setLoginPassword}
      onLoginSubmit={handleLoginSubmit}
      onQuickDemo={handleQuickDemo}
    />
  );
}

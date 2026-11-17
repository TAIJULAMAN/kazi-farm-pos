"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { AppShell } from "@/components/layout/AppShell";
import { ProfileView } from "@/components/dashboard/ProfileView";

export default function ProfilePage() {
  const { currentUser, setCurrentUser } = useApp();
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  if (!currentUser) return null;

  return (
    <AppShell currentView="PROFILE">
      <ProfileView
        currentUser={currentUser}
        isEditingProfile={isEditingProfile}
        setIsEditingProfile={setIsEditingProfile}
        onSaveProfile={(updated) => setCurrentUser(updated)}
      />
    </AppShell>
  );
}

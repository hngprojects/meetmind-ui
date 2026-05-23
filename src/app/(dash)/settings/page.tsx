import React from "react";
import ProfileHeader from "@/components/common/Profile/ProfileHeader";
import SettingsForm from "@/components/common/Profile/SettingsForm";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto pt-6">
      <ProfileHeader />
      <SettingsForm />
    </div>
  );
}

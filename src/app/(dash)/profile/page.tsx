import React from "react";
import ProfileHeader from "@/components/common/Profile/ProfileHeader";
import ProfileInfoForm from "@/components/common/Profile/ProfileInfoForm";

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto pt-6">
      <ProfileHeader />
      <ProfileInfoForm />
    </div>
  );
}

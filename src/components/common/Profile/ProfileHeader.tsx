"use client";

import { UserAvatar } from "@/components/common/UserAvatar";
import { useCurrentUserProfile } from "@/hooks/useCurrentUserProfile";
import {
  getCurrentUserDisplayName,
  getCurrentUserRole,
} from "@/lib/api/currentUser";

export default function ProfileHeader() {
  const { data: currentUser } = useCurrentUserProfile();
  const displayName = getCurrentUserDisplayName(currentUser);
  const displayRole = getCurrentUserRole(currentUser);

  return (
    <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
      <UserAvatar
        user={currentUser}
        className="h-16 w-16 border border-gray-100 text-lg shadow-sm"
      />
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">{displayName}</h1>
        <p className="text-sm text-[#5E6470] font-medium">{displayRole}</p>
      </div>
    </div>
  );
}

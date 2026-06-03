import type { CurrentUserProfile } from "@/lib/api/currentUser";
import {
  getCurrentUserDisplayName,
  getCurrentUserInitials,
} from "@/lib/api/currentUser";
import { cn } from "@/lib/utils";

type UserAvatarProps = {
  user?: Partial<CurrentUserProfile> | null;
  className?: string;
  textClassName?: string;
};

export function UserAvatar({
  user,
  className,
  textClassName,
}: UserAvatarProps) {
  const avatarUrl = user?.avatarUrl?.trim();
  const displayName = getCurrentUserDisplayName(user);

  return (
    <div
      role="img"
      aria-label={`${displayName} avatar`}
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--color-brand-primary)] bg-cover bg-center font-semibold text-[var(--color-text-white-primary)]",
        className,
      )}
      style={
        avatarUrl
          ? { backgroundImage: `url("${avatarUrl.replace(/"/g, "%22")}")` }
          : undefined
      }
    >
      {!avatarUrl && (
        <span className={cn("leading-none", textClassName)}>
          {getCurrentUserInitials(user)}
        </span>
      )}
    </div>
  );
}

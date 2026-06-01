import api from "@/lib/api";

export interface CurrentUserProfile {
  id: string;
  name: string;
  email: string;
  role?: string | null;
  companyName?: string | null;
  avatarUrl?: string | null;
  onboardingCompleted?: boolean;
}

type CurrentUserSource = Record<string, unknown>;

export async function getCurrentUserProfile(): Promise<CurrentUserProfile> {
  const response = await api.get("/api/v1/users/me");
  return normalizeCurrentUser(unwrapApiData(response.data));
}

export function normalizeCurrentUser(raw: unknown): CurrentUserProfile {
  const source = isRecord(raw) ? raw : {};
  const company = isRecord(source.company) ? source.company : null;

  const firstName =
    getStringValue(source.first_name) ?? getStringValue(source.firstName);
  const lastName =
    getStringValue(source.last_name) ?? getStringValue(source.lastName);
  const composedName = [firstName, lastName].filter(Boolean).join(" ").trim();
  const name =
    getStringValue(source.name) ??
    getStringValue(source.full_name) ??
    getStringValue(source.fullName) ??
    composedName;

  return {
    id: getStringValue(source.id) ?? "",
    name: name || "User",
    email: getStringValue(source.email) ?? "",
    role:
      getStringValue(source.role) ??
      getStringValue(source.job_title) ??
      getStringValue(source.jobTitle) ??
      null,
    companyName:
      getStringValue(source.company_name) ??
      getStringValue(source.companyName) ??
      getStringValue(company?.name) ??
      null,
    avatarUrl:
      getStringValue(source.avatar_url) ??
      getStringValue(source.avatarUrl) ??
      getStringValue(source.profile_picture_url) ??
      getStringValue(source.profilePictureUrl) ??
      null,
    onboardingCompleted: getBooleanValue(
      source.onboarding_completed ?? source.onboardingCompleted,
    ),
  };
}

export function getCurrentUserDisplayName(
  user?: Partial<CurrentUserProfile> | null,
): string {
  return user?.name?.trim() || "User";
}

export function getCurrentUserEmail(
  user?: Partial<CurrentUserProfile> | null,
): string {
  return user?.email?.trim() || "No email available";
}

export function getCurrentUserRole(
  user?: Partial<CurrentUserProfile> | null,
): string {
  return user?.role?.trim() || "No role set";
}

export function getCurrentUserCompany(
  user?: Partial<CurrentUserProfile> | null,
): string {
  return user?.companyName?.trim() || "No company set";
}

export function getCurrentUserInitials(
  user?: Partial<CurrentUserProfile> | null,
): string {
  const name = user?.name?.trim();
  if (name) {
    const initials = name
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("");

    if (initials) return initials.toUpperCase();
  }

  return (user?.email?.trim()[0] ?? "U").toUpperCase();
}

function unwrapApiData(payload: unknown): unknown {
  if (isRecord(payload) && "data" in payload) return payload.data;
  return payload;
}

function getStringValue(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function getBooleanValue(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

function isRecord(value: unknown): value is CurrentUserSource {
  return typeof value === "object" && value !== null;
}

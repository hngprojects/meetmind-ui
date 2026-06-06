import { BaseService } from "../base/base.service";
import type {
  SetRolePayload,
  SetRoleResponse,
  SetPreferencesPayload,
  SetPreferencesResponse,
  SetIntegrationsPayload,
  SetIntegrationsResponse,
  CompleteOnboardingResponse,
} from "./onboarding.type";

export class OnboardingService extends BaseService {
  static async setRole(payload: SetRolePayload): Promise<SetRoleResponse> {
    return this.post<SetRoleResponse>("/api/v1/onboarding/role", payload);
  }

  static async setPreferences(
    payload: SetPreferencesPayload,
  ): Promise<SetPreferencesResponse> {
    return this.post<SetPreferencesResponse>(
      "/api/v1/onboarding/preferences",
      payload,
    );
  }

  static async setIntegrations(
    payload: SetIntegrationsPayload,
  ): Promise<SetIntegrationsResponse> {
    return this.post<SetIntegrationsResponse>(
      "/api/v1/onboarding/integrations",
      payload,
    );
  }

  static async completeOnboarding(): Promise<CompleteOnboardingResponse> {
    return this.post<CompleteOnboardingResponse>(
      "/api/v1/onboarding/submission",
    );
  }
}

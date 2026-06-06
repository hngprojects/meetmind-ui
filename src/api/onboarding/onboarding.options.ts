"use client";

import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import { OnboardingService } from "./onboarding.service";
import type { ApiError } from "../base/base.error";
import type {
  SetRolePayload,
  SetRoleResponse,
  SetPreferencesPayload,
  SetPreferencesResponse,
  SetIntegrationsPayload,
  SetIntegrationsResponse,
  CompleteOnboardingResponse,
} from "./onboarding.type";

export const onboardingMutationKeys = {
  setRole: ["onboarding", "role"] as const,
  setPreferences: ["onboarding", "preferences"] as const,
  setIntegrations: ["onboarding", "integrations"] as const,
  completeOnboarding: ["onboarding", "complete"] as const,
};

export function useSetRole(
  options?: UseMutationOptions<SetRoleResponse, ApiError, SetRolePayload>,
) {
  return useMutation<SetRoleResponse, ApiError, SetRolePayload>({
    mutationKey: onboardingMutationKeys.setRole,
    mutationFn: (payload) => OnboardingService.setRole(payload),
    ...options,
  });
}

export function useSetPreferences(
  options?: UseMutationOptions<
    SetPreferencesResponse,
    ApiError,
    SetPreferencesPayload
  >,
) {
  return useMutation<SetPreferencesResponse, ApiError, SetPreferencesPayload>({
    mutationKey: onboardingMutationKeys.setPreferences,
    mutationFn: (payload) => OnboardingService.setPreferences(payload),
    ...options,
  });
}

export function useSetIntegrations(
  options?: UseMutationOptions<
    SetIntegrationsResponse,
    ApiError,
    SetIntegrationsPayload
  >,
) {
  return useMutation<SetIntegrationsResponse, ApiError, SetIntegrationsPayload>(
    {
      mutationKey: onboardingMutationKeys.setIntegrations,
      mutationFn: (payload) => OnboardingService.setIntegrations(payload),
      ...options,
    },
  );
}

export function useCompleteOnboarding(
  options?: UseMutationOptions<CompleteOnboardingResponse, ApiError, void>,
) {
  return useMutation<CompleteOnboardingResponse, ApiError, void>({
    mutationKey: onboardingMutationKeys.completeOnboarding,
    mutationFn: () => OnboardingService.completeOnboarding(),
    ...options,
  });
}

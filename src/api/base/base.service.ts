import type { AxiosRequestConfig } from "axios";
import { baseClient } from "./base.server";
import { handleApiError } from "./base.error";

export class BaseService {
  protected static async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await baseClient.get<T>(url, config);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  protected static async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await baseClient.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  protected static async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await baseClient.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  protected static async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await baseClient.patch<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  protected static async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await baseClient.delete<T>(url, config);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
}

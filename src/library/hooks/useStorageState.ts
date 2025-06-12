import { useState } from "react";

export const useStorageState = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const setLoadingState = (loading: boolean) => {
    setIsLoading(loading);
  };

  const setErrorState = (errorMessage: string | null) => {
    setError(errorMessage);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    isLoading,
    error,
    setLoadingState,
    setErrorState,
    clearError,
  };
};

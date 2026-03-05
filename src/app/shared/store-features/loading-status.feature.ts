import { signalStoreFeature, withComputed, withState } from '@ngrx/signals';
import { computed } from '@angular/core';

export type LoadingState = { isLoading: boolean };

export function withLoadingStatus() {
  return signalStoreFeature(
    withState<LoadingState>({ isLoading: false }),
    withComputed(({ isLoading }) => ({
      inProgress: computed(() => isLoading() === true),
    })),
  );
}

export function setIsLoading(loading: boolean): LoadingState {
  return { isLoading: loading };
}

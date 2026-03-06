import { PartialStateUpdater } from '@ngrx/signals';

export function setProp<T extends object, K extends keyof T>(
  key: K,
  value: T[K],
): PartialStateUpdater<T> {
  return (state: T): T => ({ ...state, [key]: value });
}

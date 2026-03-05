import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, map, tap, of } from 'rxjs';
import { WorkOrdersTimelineGridState } from '../work-orders-timeline-grid.interfaces';
import {
  setIsLoading,
  withLoadingStatus,
} from '../../shared/store-features/loading-status.feature';
import { setProp } from '../../shared/store-features/state-updater';

const state: WorkOrdersTimelineGridState = {
  currentString: '',
};

export const WorkOrdersTimelineGridStore = signalStore(
  withState<WorkOrdersTimelineGridState>(state),
  withLoadingStatus(),
  withComputed((store) => ({})),
  withMethods((store) => {
    const loadCurrentString = rxMethod<void>(
      pipe(
        tap(() => patchState(store, setIsLoading(true))),
        switchMap(() => {
          patchState(store, setProp('currentString', 'Hello World'));
          return of(null);
        }),
      ),
    );

    return { loadCurrentString };
  }),
  withHooks({
    onInit: ({ loadCurrentString }) => {
      loadCurrentString();
    },
  }),
);

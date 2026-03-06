# Work Order Schedule Timeline

Timeline view for scheduling and managing work orders across work centers. Built with Angular 19.

## Setup

```bash
npm install
ng serve
```

Open `http://localhost:4200`

Requires Node 22.x or 23.x

## Overview

Displays work orders on a horizontal timeline grid. Users can switch between day, week and month views. Work orders are shown as colored bars based on their status. Clicking on the grid opens a panel to create new orders, and existing orders can be edited or deleted via a context menu.

## Libraries

- **@ngrx/signals** — State management using signal store
- **@angular/forms** — Reactive forms for the create/edit panel
- **rxjs** — Reactive data flow
- **bootstrap** — Base styling

## Structure

- `components/data-access/` — Store and facade
- `components/feature/` — Main page component
- `components/ui/` — Timeline grid, bars, filters, event panel
- `shared/store-features/` — Reusable store utilities

## Notes

See `docs` for trade-offs and future improvements.

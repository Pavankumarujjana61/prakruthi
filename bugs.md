# Bugs Report

## Changes Made
- Removed `build` script from `package.json`.
- Verified all `src/**/*.js` files with `node --check` and no syntax errors were found.

## ESLint Errors (32 errors)

### src/controllers/adminController.js
- 72:29 — `Vehicle` is not defined (`no-undef`)
- 73:28 — `Driver` is not defined (`no-undef`)
- 75:27 — `Route` is not defined (`no-undef`)
- 79:32 — `Delivery` is not defined (`no-undef`)

### src/controllers/adminDriversController.js
- 20:21 — Unnecessary escape character: `\-` (`no-useless-escape`)

### src/controllers/adminTripsController.js
- 133:11 — `statusFilter` is assigned a value but never used (`no-unused-vars`)

### src/controllers/adminVehiclesController.js
- 18:7 — `getStatusBadgeClass` is assigned a value but never used (`no-unused-vars`)

### src/controllers/alerts.js
- 3:10 — `buildSearchQuery` is defined but never used (`no-unused-vars`)

### src/controllers/trip.js
- 1:14 — `fn` is defined but never used (`no-unused-vars`)
- 1:18 — `col` is defined but never used (`no-unused-vars`)
- 9:8 — `Supervisor` is defined but never used (`no-unused-vars`)
- 10:8 — `uploadVoice` is defined but never used (`no-unused-vars`)
- 717:3 — `remarks` is assigned a value but never used (`no-unused-vars`)

### src/controllers/vehicles.js
- 1:14 — `fn` is defined but never used (`no-unused-vars`)
- 1:18 — `col` is defined but never used (`no-unused-vars`)

### src/middleware/errorHandler.js
- 3:38 — `next` is defined but never used (`no-unused-vars`)

### src/models/User.js
- 17:14 — Unnecessary escape character: `\.` (`no-useless-escape`)
- 17:30 — Unnecessary escape character: `\.` (`no-useless-escape`)
- 34:25 — Unnecessary escape character: `\(` (`no-useless-escape`)
- 34:27 — Unnecessary escape character: `\)` (`no-useless-escape`)

### src/routes/vehicles.js
- 11:10 — `protect` is defined but never used (`no-unused-vars`)
- 11:19 — `authorize` is defined but never used (`no-unused-vars`)

### src/validations/index.js
- 22:26 — Unnecessary escape character: `\(` (`no-useless-escape`)
- 22:28 — Unnecessary escape character: `\)` (`no-useless-escape`)
- 55:26 — Unnecessary escape character: `\(` (`no-useless-escape`)
- 55:28 — Unnecessary escape character: `\)` (`no-useless-escape`)
- 76:26 — Unnecessary escape character: `\(` (`no-useless-escape`)
- 76:28 — Unnecessary escape character: `\)` (`no-useless-escape`)
- 168:26 — Unnecessary escape character: `\(` (`no-useless-escape`)
- 168:28 — Unnecessary escape character: `\)` (`no-useless-escape`)
- 199:26 — Unnecessary escape character: `\(` (`no-useless-escape`)
- 199:28 — Unnecessary escape character: `\)` (`no-useless-escape`)

## Notes
- `npm run lint` currently reports these errors.
- No build script exists now.
- Syntax check with `node --check` passed for all JavaScript source files under `src/`.

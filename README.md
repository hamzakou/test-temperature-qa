# Temperature Sensor — QA Engineer Kata

Full-stack temperature sensor simulation app. The QA candidate is responsible for building the entire test coverage.

> ⚠️ **This project is delivered without any tests.** It is intended as support material for a QA exercise.

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript strict
- Prisma 6 + PostgreSQL 18
- Docker Compose

## Run the project

```bash
docker compose up --build
```

The app is available at http://localhost:3000.

Migration and seed run automatically on container startup.

## Local dev (without Docker for the app)

```bash
docker compose up db -d
cp .env.example .env
yarn install
yarn db:push
yarn db:seed
yarn dev
```

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/temperature/capture` | Capture a sensor reading |
| GET | `/api/temperature/history` | Returns the last 15 readings |
| GET | `/api/thresholds` | Returns active thresholds |
| PUT | `/api/thresholds` | Updates thresholds |

## Dashboard

Single page with 3 sections:
1. **Capture** — Button to trigger a sensor reading
2. **History** — Table of the last 15 captures
3. **Thresholds** — Configuration form for COLD/HOT boundaries

## Environment variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `FIXED_TEMPERATURE` | Fixed sensor value (empty = random) |

---

## QA Exercise — Expectations

This project is intentionally delivered with **zero tests** and contains **deliberate bugs, edge cases, and inconsistencies** for candidates to discover and cover. Finding them is part of the exercise.

### Test coverage expected

#### 1. UI / E2E — Playwright + Cucumber

- Write BDD scenarios in Gherkin (`.feature` files)
- Implement step definitions using Playwright
- Cover the following flows:
  - Capture a temperature and verify the result display
  - Verify history table updates after capture
  - Update thresholds with valid values
  - Submit invalid thresholds and verify error messages
  - Verify button is disabled during capture (no double-click)
  - Verify color-coded badges (COLD=blue, WARM=orange, HOT=red)
  - Keyboard navigation and basic accessibility

#### 2. API — Karate

- Test all 4 API endpoints:
  - `POST /api/temperature/capture` — status 201, response schema validation
  - `GET /api/temperature/history` — pagination (max 15), ordering (newest first)
  - `GET /api/thresholds` — returns current config
  - `PUT /api/thresholds` — valid updates, validation errors (400)
- Cover edge cases:
  - Boundary values for thresholds
  - Invalid input types in PUT body
  - Extreme gap values between thresholds
  - `coldMax > hotMin`
- Verify response schema consistency across endpoints
- Use `FIXED_TEMPERATURE` env variable for deterministic test scenarios

#### 3. Performance — K6

- Load test the capture endpoint under concurrency
- Stress test threshold updates
- Verify response times stay under acceptable limits (e.g. p95 < 200ms)
- Ramp-up scenarios (gradual load increase)
- Identify potential bottlenecks (database writes, connection pooling)

#### 4. Automation & CI/CD

- All tests must be runnable in a CI pipeline
- Provide a `docker-compose.test.yml` or equivalent for isolated test execution
- Generate test reports (HTML, JUnit XML)
- Code coverage measurement where applicable
- Tests must be idempotent and independent (no shared state between runs)

### Evaluation criteria

- **Coverage** — All endpoints and UI flows are tested
- **Edge cases** — Deliberate bugs/inconsistencies are identified and covered
- **Code quality** — Tests are readable, maintainable, and follow conventions
- **Determinism** — Tests produce consistent results (use `FIXED_TEMPERATURE`)
- **Reporting** — Clear test reports with pass/fail visibility
- **Architecture** — Clean separation between test types (unit, integration, E2E, performance)

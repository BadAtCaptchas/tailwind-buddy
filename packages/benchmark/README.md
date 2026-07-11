# Benchmarks

The benchmark compares equivalent Tailwind Buddy, CVA, and Tailwind Variants
configurations. Output equivalence is tested before performance is measured.

From the repository root:

```bash
pnpm install --frozen-lockfile
pnpm tailwindbuddy:build
pnpm --filter benchmark test
pnpm --filter benchmark benchmark
```

Each run prints the Node version, operating system and architecture, and the
exact package versions before reporting operations per second. Treat results
as machine- and version-specific; do not compare results captured with
different environments.

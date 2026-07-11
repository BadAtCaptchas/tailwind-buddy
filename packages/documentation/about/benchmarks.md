---
title: Tailwind buddy Benchmarks
editLink: true
---

# Benchmarks

The reproducible benchmark lives in `packages/benchmark`. It validates that
each library returns equivalent output, then prints the runtime environment and
dependency versions before measuring performance. Results are specific to the
machine and package versions used for that run.

```bash
pnpm tailwindbuddy:build
pnpm --filter benchmark test
pnpm --filter benchmark benchmark
```

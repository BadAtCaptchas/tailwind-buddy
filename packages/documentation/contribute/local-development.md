---
title: Tailwind buddy local development
editLink: true
---

# Local Development

1. Run `nvm use` to select the repository's Node LTS version.
2. Install the pinned pnpm version with Corepack if it is not already present.
3. Run `pnpm install --frozen-lockfile` in the repository root.
4. Run `pnpm verify` for the same build, test, type, lint, formatting,
   documentation, and package checks used by CI.

For a "real world example":

1. Run `pnpm --filter ui-kit build`.
2. Run `pnpm --filter sandbox dev`.

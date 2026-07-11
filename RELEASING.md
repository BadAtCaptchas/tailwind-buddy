# Releasing Tailwind Buddy

Releases are published from immutable `vX.Y.Z` tags with npm trusted
publishing. No npm or GitHub personal access token is used by the workflow.

## One-time repository setup

1. Create a protected GitHub environment named `npm` and require maintainer
   approval for deployments.
2. In the npm settings for `@busbud/tailwind-buddy`, configure a GitHub trusted
   publisher with:
   - Organization: `busbud`
   - Repository: `tailwind-buddy`
   - Workflow: `publish-npm.yml`
   - Environment: `npm`
   - Permission: publish
3. After one successful trusted release, set npm publishing access to require
   2FA and disallow tokens, then remove the repository's `NPM_TOKEN` and
   `GH_TOKEN` secrets.

## Publishing a release

1. Start from an up-to-date, clean `main` branch.
2. Run `pnpm verify`.
3. Run `pnpm tailwindbuddy:release:prepare` and review the version and
   `CHANGELOG.md` changes it creates.
4. Confirm the package version is `X.Y.Z` and the release tag is exactly
   `vX.Y.Z`.
5. Push the release commit and tag.

The tag-triggered workflow checks the version, repeats the full verification,
and runs `npm publish`. npm automatically records provenance for a public
package published from the public GitHub repository.

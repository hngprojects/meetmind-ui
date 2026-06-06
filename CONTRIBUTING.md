# Contributing to Meetmind UI

Thank you for your interest in contributing to Meetmind UI! This project is the frontend for the Meetmind platform.

## Development Workflow

1. **Fork and Clone**: Fork the repository and create your branch from `dev`.
2. **Branch Naming**: Follow these conventions:
   - `feat/description` or `feature/description`
   - `fix/description` or `bugfix/description`
   - `chore/description` (maintenance)
   - `docs/description` (documentation)
   - `refactor/description` (code restructuring)
   - `hotfix/description` (critical production fixes)
3. **Environment**: Ensure you are using Node.js >= 20.0.0 and pnpm >= 9.0.0.
4. **Testing**: Run tests before submitting: `pnpm test`.
5. **Linting & Formatting**: Ensure your code passes linting: `pnpm lint`. (Note: This is automatically handled on commit via Husky).

## Commit Standards

We strictly follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. This helps in generating changelogs and managing versions.

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to our CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files

Example: `feat: add glassmorphism effect to the landing page hero`

## Pull Request Process

1. Submit your PR against the **dev branch**.
2. Fill out the PR template completely.
3. Ensure all CI checks pass.
4. Include screenshots or videos for UI changes.
5. Link any related issues in the description.

---

### Security Note

Every commit is scanned for potential malicious configuration injections. Ensure your configuration files (e.g., `next.config.ts`, `postcss.config.mjs`) remain clean and follow standard patterns.

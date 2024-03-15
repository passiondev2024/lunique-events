// Commit message prefixes:
// - build: Changes related to project build or infrastructure.
// - chore: Administrative changes not directly related to product functionality.
// - ci: Changes related to continuous integration (CI).
// - docs: Documentation-related changes.
// - feat: Addition of new features.
// - fix: Bug fixes.
// - perf: Changes to improve performance.
// - refactor: Code refactoring without changing functionality.
// - revert: Reverting previous changes.
// - style: Cosmetic changes like formatting or style guide edits.
// - test: Addition or modification of tests.

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [2, "always", 150],
  },
};

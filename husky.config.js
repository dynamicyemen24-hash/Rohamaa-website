// ============================================================
// Husky Configuration - Git Hooks للجودة
// ============================================================
module.exports = {
  hooks: {
    'pre-commit': [
      'lint-staged',
    ],
    'commit-msg': [
      'commitlint -E HUSKY_GIT_PARAMS'
    ],
    'pre-push': [
      'pnpm typecheck',
      'pnpm build'
    ]
  }
};

// lint-staged configuration
module.exports.lintStaged = {
  '*.{ts,tsx}': [
    'eslint --fix',
    'prettier --write'
  ],
  '*.{json,md,css}': [
    'prettier --write'
  ]
};
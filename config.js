module.exports = {
  onboarding: false,
  token: process.env.GITHUB_TOKEN,
  gitAuthor: "Renovate Bot <renovate@mail.com>",

  configFileNames: ["config.js"],

  // ─── Explicit repo list ──────────────────────────────────────────────────
  repositories: ["cookielevanna5/cryptoapp"],

  // ─── File matching for <env>-values.yaml naming convention ──────────────
  "helm-values": {
    managerFilePatterns: ["/applications/[^/]+/[^/]+/[^/]+-values\\.ya?ml$/"],
  },

  packageRules: [
    {
      matchManagers: ["helm-values"],
      matchDatasources: ["docker"],

      additionalBranchPrefix: "{{replace 'applications/' '' parentDir}}-",

      commitMessageAction: "⬆️ [{{replace 'applications/' '' parentDir}}] bump",
      commitMessageTopic: "{{depName}}",
      commitMessageExtra: "{{currentVersion}} → {{newVersion}}",

      pinDigests: false,
    },
  ],
};

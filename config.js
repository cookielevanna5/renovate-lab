module.exports = {
  enabled: true,
  onboarding: false,
  requireConfig: "optional",
  token: process.env.GITHUB_TOKEN,
  gitAuthor: "Renovate Bot <renovate@mail.com>",
  repositories: ["cookielevanna5/cryptoapp"],

  prHourlyLimit: 0,

  "helm-values": {
    managerFilePatterns: ["/applications/[^/]+/[^/]+/[^/]+-values\\.ya?ml$/"],
  },

  packageRules: [
    {
      matchManagers: ["helm-values"],
      matchDatasources: ["docker"],

      // ── handles both "1.0.0" and "v1.0.0" tag formats ──────────────────
      versioning: "docker",

      additionalBranchPrefix: "{{replace 'applications/' '' parentDir}}-",

      commitMessageAction: "⬆️ [{{replace 'applications/' '' parentDir}}] bump",
      commitMessageTopic: "{{depName}}",
      commitMessageExtra: "{{currentVersion}} → {{newVersion}}",

      pinDigests: false,
    },
  ],
};

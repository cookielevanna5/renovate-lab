module.exports = {
  $schema: "https://docs.renovatebot.com/renovate-schema.json",
  onboarding: false,
  token: process.env.GITHUB_TOKEN,
  gitAuthor: "Renovate Bot <renovate@mail.com>",
  repositories: ["cookielevanna5/cryptoapp"],

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

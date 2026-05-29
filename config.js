module.exports = {
  enabled: true,
  onboarding: false,
  requireConfig: "optional",
  token: process.env.GITHUB_TOKEN,
  gitAuthor: "Renovate Bot <renovate@mail.com>",
  repositories: ["cookielevanna5/renovate-lab"],

  prHourlyLimit: 0,

  "helm-values": {
    managerFilePatterns: ["/applications/[^/]+/[^/]+/[^/]+-values\\.ya?ml$/"],
  },

  packageRules: [
    {
      matchManagers: ["helm-values"],
      matchDatasources: ["docker"],
      versioning: "docker",
      pinDigests: false,

      // ── Fix grouping: each file gets its own PR ──────────────────────────
      branchName:
        "renovate/{{replace 'applications/' '' parentDir}}-{{depName}}-{{newMajor}}.x",
      additionalBranchPrefix: "",

      // ── Fix title: use packageFileDir instead of parentDir ───────────────
      // packageFileDir = "applications/app/beta"
      // after replace → "app/beta" → "app - beta"
      commitMessageAction:
        "⬆️ [{{regexReplace 'applications/([^/]+)/([^/]+)' '$1 - $2' packageFileDir}}] bump",
      commitMessageTopic: "{{depName}}",
      commitMessageExtra: "{{currentVersion}} → {{newVersion}}",
    },
  ],
};

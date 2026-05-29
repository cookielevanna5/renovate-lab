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

      // ── One branch per app+env+image, no grouping ───────────────────────
      additionalBranchPrefix: "{{replace 'applications/' '' parentDir}}-",
      branchTopic: "{{depName}}-{{newMajor}}.x",

      // ── "applications/app/beta" → "app - beta" via regex capture groups ─
      commitMessageAction:
        "⬆️ [{{replace '^applications/([^/]+)/([^/]+)$' '$1 - $2' parentDir}}] bump",
      commitMessageTopic: "{{depName}}",
      commitMessageExtra: "{{currentVersion}} → {{newVersion}}",
    },
  ],
};

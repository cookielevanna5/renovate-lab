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

      // ── Each unique app+env gets its own branch ──────────────────────────
      // parentDir = "applications/app/beta"
      // replace 'applications/' '' → "app/beta"
      // then used as prefix → "renovate/app/beta-docker.io/busybox-1.x"
      // Renovate sanitizes slashes in branch names automatically
      additionalBranchPrefix: "{{parentDir}}-",

      // ── Title uses same regex capture ────────────────────────────────────
      // parentDir = "applications/app/beta" → "$1 - $2" = "app - beta"
      commitMessageAction:
        "⬆️ [{{replace '^applications/([^/]+)/([^/]+)$' '$1 - $2' parentDir}}] bump",
      commitMessageTopic: "{{depName}}",
      commitMessageExtra: "{{currentVersion}} → {{newVersion}}",

      // ── This is the key fix: each packageFile gets its own PR ────────────
      separateMultipleMajors: true,
      separateMinorPatch: false,
    },
  ],
};

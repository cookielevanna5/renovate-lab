module.exports = {
  onboarding: false,
  token: process.env.GITHUB_TOKEN,

  // ─── File matching for non-conventional values filenames ─────────────────
  // Replaces the default "/(^|/)values\.ya?ml$/" to match:
  // applications/<app>/<env>/<env>-values.yaml
  "helm-values": {
    managerFilePatterns: ["/applications/[^/]+/[^/]+/[^/]+-values\\.ya?ml$/"],
  },

  packageRules: [
    {
      matchManagers: ["helm-values"],
      matchDatasources: ["docker"],

      // ─── Monorepo branch split per app+env ───────────────────────────────
      additionalBranchPrefix: "{{replace 'applications/' '' parentDir}}-",

      // ─── PR / commit title subcomponents (non-deprecated API) ────────────
      // Renovate assembles: "<action> <topic> <extra>"
      // Result: "chore(app1/int): bump some-docker/dependency to v1.1.0"
      //
      // prTitle mirrors commitMessage automatically — no need to set it.
      commitMessageAction: "⬆️ [{{replace 'applications/' '' parentDir}}] bump",
      commitMessageTopic: "{{depName}}",
      commitMessageExtra: "{{currentVersion}} → {{newVersion}}",

      // pinDigests off (inherit from default, stated explicitly for clarity)
      pinDigests: false,
    },
  ],
};

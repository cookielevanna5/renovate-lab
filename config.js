module.exports = {
  onboarding: false,

  // ─── File matching for non-conventional values filenames ────────────────────
  // Overrides the default "/(^|/)values\.ya?ml$/" to match our pattern:
  // applications/<app>/<env>/<env>-values.yaml
  helmValues: {
    commitMessageTopic: "helm values {{depName}}",
    managerFilePatterns: ["/applications/[^/]+/[^/]+/[^/]+-values\\.ya?ml$/"],
    pinDigests: false,
  },

  packageRules: [
    {
      // ─── Apply to all helm-values managed docker image updates ─────────────
      matchManagers: ["helmv3", "helm-values"],
      matchDatasources: ["docker"],

      // ─── Monorepo team split: prefix branch with <app>/<env> ──────────────
      // parentDir resolves to e.g. "applications/app1/int"
      // so the branch becomes: renovate/app1-int-<depName>-<newVersion>
      additionalBranchPrefix: "{{parentDir}}-",

      // ─── Clean, descriptive PR title ──────────────────────────────────────
      // Example output:
      //   [app1/int] ⬆️ Bump some-docker/dependency: v1.0.0 → v1.1.0
      //
      // {{packageFileDir}} = "applications/app1/int"  (trimmed below via regex)
      // We extract app + env from the path with a lookup table approach,
      // but the cleanest native Renovate way is using packageFileDir directly.
      // Renovate >= 37 — strips leading "applications/" from the bracket label
      prTitle:
        "[{{replace 'applications/' '' parentDir}}] ⬆️ Bump {{depName}}: {{currentVersion}} → {{newVersion}}",

      commitMessage:
        "chore({{parentDir}}): bump {{depName}} {{currentVersion}} → {{newVersion}}",
      commitMessageTopic: "{{depName}}",
    },
  ],
};

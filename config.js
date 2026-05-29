const fs = require("fs");
const path = require("path");

// ── Dynamically generate one packageRule per applications/<app>/<env> ──────
// This reads the actual directory structure at Renovate config-parse time,
// so adding a new app/env folder automatically gets its own PR rule.
function generateAppEnvRules() {
  const appsRoot = path.join(__dirname, "applications");

  if (!fs.existsSync(appsRoot)) return [];

  const rules = [];

  for (const app of fs.readdirSync(appsRoot)) {
    const appPath = path.join(appsRoot, app);
    if (!fs.statSync(appPath).isDirectory()) continue;

    for (const env of fs.readdirSync(appPath)) {
      const envPath = path.join(appPath, env);
      if (!fs.statSync(envPath).isDirectory()) continue;

      rules.push({
        matchFileNames: [`applications/${app}/${env}/**`],
        additionalBranchPrefix: `${app}-${env}-`,
        commitMessageAction: `⬆️ 🎉 [${app} - ${env}] bump`,
      });
    }
  }

  return rules;
}

module.exports = {
  enabled: true,
  onboarding: false,
  requireConfig: "optional",
  token: process.env.GITHUB_TOKEN,
  gitAuthor: "Renovate Bot <renovate@mail.com>",
  repositories: ["cookielevanna5/renovate-lab"],
  prHourlyLimit: 0,

  // ── Disable semantic commit detection and set our own prefix ─────────────
  semanticCommits: "disabled",
  commitMessagePrefix: "Release",

  "helm-values": {
    managerFilePatterns: ["/applications/[^/]+/[^/]+/[^/]+-values\\.ya?ml$/"],
  },

  packageRules: [
    {
      matchManagers: ["helm-values"],
      matchDatasources: ["docker"],
      versioning: "docker",
      pinDigests: false,
      commitMessageTopic: "{{depName}}",
      commitMessageExtra: "{{currentVersion}} → {{newVersion}}",
    },
    ...generateAppEnvRules(),
  ],
};

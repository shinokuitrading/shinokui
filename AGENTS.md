# Repository workflow

- After completing and validating any user-requested change to repository files, create a Git commit automatically without asking for confirmation.
- Stage and commit only the files changed for the current task. Never include pre-existing or unrelated changes.
- Use a concise commit message that describes the completed change.
- After creating the commit, push it automatically to the current branch's configured upstream so connected deployment services can update the site.
- Do not commit when validation fails, the requested work is incomplete, or file ownership is unclear; report the issue instead.
- If the branch has no configured upstream or a normal push fails, do not force the update; report the issue instead.
- Never amend, reset, rebase, force-push, or push to a different branch unless the user explicitly requests it.

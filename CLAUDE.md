# Project instructions

LXTZFR Toolbox: a VS Code extension grouping small workspace helpers (plain JS, `main: ./extension.js`, no build,
no dependency). One file per helper (`unityExplorer.js`), registered from `extension.js`; `logger.js` is the shared
Output channel.

## Native VS Code config first

Before coding a feature in the extension, check whether it can be done with native VS Code configuration (settings, keybindings, built-in commands, existing views/menus). Only implement it in the extension if native config cannot do it.

## Rules

- Ids are prefixed `lxtzfrToolbox.` (commands, settings, context keys); every command used in a menu is declared in
  `package.json` `contributes.commands`.
- The Git helpers (source control, graph, window title) live in Git Weave (github.com/lxtzfr/vscode-git-weave), not here.

<!-- my-stack:core:conventions:start -->
<!-- Managed by my-stack (`my-stack update`): do not edit inside this block. -->
@claude/my-stack/core/CLAUDE.md
<!-- my-stack:core:conventions:end -->

<!-- my-stack:local:start -->
<!-- Managed by my-stack (`my-stack update`): do not edit inside this block. -->
my-stack copies not committed (`my-stack.json` `local`): `core`.
When one is missing (fresh clone: no `claude/my-stack/<kit>/`), say so before any task: `my-stack restore`
rewrites them (needs the my-stack clone).
<!-- my-stack:local:end -->

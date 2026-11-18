const vscode = require('vscode');
const { log } = require('./logger');

// Groups of Unity files that can be hidden from the Explorer (and search) via files.exclude.
// Patterns are configurable through the "lxtzfrToolbox.unity.patterns" setting.
const GROUPS = ['meta', 'generated', 'projectFiles', 'projectSettings'];
const DEFAULT_HIDDEN = ['meta', 'generated', 'projectFiles'];
const SETTINGS_SECTION = 'lxtzfrToolbox.unity';
const INITIALIZED_KEY = 'unity.hiddenFiles.initialized';

function getPatterns() {
  return vscode.workspace.getConfiguration(SETTINGS_SECTION).get('patterns') || {};
}

function getWorkspaceExclude() {
  const inspected = vscode.workspace.getConfiguration('files').inspect('exclude');
  return { ...(inspected.workspaceValue || {}) };
}

function isGroupHidden(group, exclude = getWorkspaceExclude()) {
  const patterns = getPatterns()[group] || [];
  return patterns.length > 0 && patterns.every((p) => exclude[p] === true);
}

async function setGroupsHidden(groups, hidden) {
  log.info(`[unity] ${hidden ? 'hide' : 'show'} ${groups.join(', ')}`);
  const exclude = getWorkspaceExclude();
  const patterns = getPatterns();
  for (const group of groups) {
    for (const p of patterns[group] || []) {
      if (hidden) exclude[p] = true;
      else delete exclude[p];
    }
  }
  await vscode.workspace
    .getConfiguration('files')
    .update('exclude', Object.keys(exclude).length ? exclude : undefined, vscode.ConfigurationTarget.Workspace);
}

async function isUnityProject() {
  const found = await vscode.workspace.findFiles('ProjectSettings/ProjectVersion.txt', undefined, 1);
  return found.length > 0;
}

function updateContextKeys() {
  const exclude = getWorkspaceExclude();
  for (const group of GROUPS) {
    vscode.commands.executeCommand('setContext', `lxtzfrToolbox.unity.hidden.${group}`, isGroupHidden(group, exclude));
  }
}

async function registerUnityExplorer(context) {
  for (const group of GROUPS) {
    context.subscriptions.push(
      vscode.commands.registerCommand(`lxtzfrToolbox.unity.hide.${group}`, () => setGroupsHidden([group], true)),
      vscode.commands.registerCommand(`lxtzfrToolbox.unity.show.${group}`, () => setGroupsHidden([group], false))
    );
  }
  context.subscriptions.push(
    vscode.commands.registerCommand('lxtzfrToolbox.unity.hideAll', () => setGroupsHidden(GROUPS, true)),
    vscode.commands.registerCommand('lxtzfrToolbox.unity.showAll', () => setGroupsHidden(GROUPS, false)),
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration('files.exclude') || e.affectsConfiguration(`${SETTINGS_SECTION}.patterns`)) {
        updateContextKeys();
      }
    })
  );

  const unity = await isUnityProject();
  await vscode.commands.executeCommand('setContext', 'lxtzfrToolbox.isUnityProject', unity);
  if (!unity) return;

  // First time this Unity project is opened: apply the default hidden groups.
  if (!context.workspaceState.get(INITIALIZED_KEY)) {
    await setGroupsHidden(DEFAULT_HIDDEN, true);
    await context.workspaceState.update(INITIALIZED_KEY, true);
  }
  updateContextKeys();
}

module.exports = { registerUnityExplorer };

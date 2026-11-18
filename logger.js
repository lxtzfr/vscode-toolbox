const vscode = require('vscode');

// Shared "LXTZFR Toolbox" log channel (Output panel), with levels.
const log = vscode.window.createOutputChannel('LXTZFR Toolbox', { log: true });

module.exports = { log };

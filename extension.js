const { log } = require('./logger');
const { registerUnityExplorer } = require('./unityExplorer');

async function activate(context) {
  log.info('Activating');
  context.subscriptions.push(log);
  await registerUnityExplorer(context);
}

function deactivate() {}

module.exports = { activate, deactivate };

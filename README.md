# LXTZFR Toolbox

Small VS Code helpers that do not deserve an extension each. Plain JavaScript, no build step, no dependency.

## Features

- **Unity**: in a Unity project (`ProjectSettings/ProjectVersion.txt`), an Explorer menu (eye icon, and the
  root folder's right-click) that hides `.meta` files, generated folders (Library, Temp, Logs…), project files
  (`.csproj`, `.sln`…) and ProjectSettings, through the workspace's `files.exclude`. The first three are hidden the
  first time a Unity project is opened. Patterns per group: the `lxtzfrToolbox.unity.patterns` setting.

## Install

From the Extensions view: search **LXTZFR Toolbox**, or **Install from VSIX…** with a `.vsix` of the releases.

## Logs

**Output** panel, channel **LXTZFR Toolbox**.

## License

[MIT](LICENSE)

"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const fs = require("fs/promises");
const babel = require("@babel/core");
const execa = require("execa");
const signalR = require("@microsoft/signalr");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const path__namespace = /* @__PURE__ */ _interopNamespaceDefault(path);
const fs__namespace = /* @__PURE__ */ _interopNamespaceDefault(fs);
const babel__namespace = /* @__PURE__ */ _interopNamespaceDefault(babel);
const signalR__namespace = /* @__PURE__ */ _interopNamespaceDefault(signalR);
const icon = path.join(__dirname, "../../resources/icon.png");
const splashPage = path.join(__dirname, "../../resources/splash.html");
class ProjectManager {
  recentProjectsPath;
  constructor(userDataPath) {
    this.recentProjectsPath = path__namespace.join(userDataPath, "recent-projects.json");
  }
  /**
   * Create a new Minimact project from template
   */
  async createProject(projectPath, template) {
    const projectName = path__namespace.basename(projectPath);
    await fs__namespace.mkdir(projectPath, { recursive: true });
    await this.createProjectStructure(projectPath, projectName, template);
    const port = await this.detectPort(projectPath);
    const project = {
      name: projectName,
      path: projectPath,
      port,
      template,
      createdAt: /* @__PURE__ */ new Date(),
      lastOpened: /* @__PURE__ */ new Date()
    };
    await this.addToRecentProjects(project);
    return project;
  }
  /**
   * Load an existing Minimact project
   */
  async loadProject(projectPath) {
    const projectName = path__namespace.basename(projectPath);
    const exists = await fs__namespace.access(projectPath).then(() => true).catch(() => false);
    if (!exists) {
      throw new Error(`Project not found: ${projectPath}`);
    }
    const port = await this.detectPort(projectPath);
    const project = {
      name: projectName,
      path: projectPath,
      port,
      template: "Unknown",
      createdAt: /* @__PURE__ */ new Date(),
      lastOpened: /* @__PURE__ */ new Date()
    };
    await this.addToRecentProjects(project);
    return project;
  }
  /**
   * Get list of recent projects
   */
  async getRecentProjects() {
    try {
      const data = await fs__namespace.readFile(this.recentProjectsPath, "utf-8");
      return JSON.parse(stripBom(data));
    } catch {
      return [];
    }
  }
  /**
   * Scan project files (TSX, C#, etc.)
   */
  async scanProjectFiles(projectPath) {
    async function scanDirectory(dir) {
      const entries = await fs__namespace.readdir(dir, { withFileTypes: true });
      const items = [];
      const directories = [];
      const files = [];
      for (const entry of entries) {
        if (entry.isDirectory()) {
          if (!["node_modules", "bin", "obj", ".git", "dist", "out", ".vs"].includes(entry.name)) {
            directories.push(entry);
          }
        } else {
          files.push(entry);
        }
      }
      directories.sort((a, b) => a.name.localeCompare(b.name));
      files.sort((a, b) => a.name.localeCompare(b.name));
      for (const entry of directories) {
        const fullPath = path__namespace.join(dir, entry.name);
        const children = await scanDirectory(fullPath);
        if (children.length > 0) {
          items.push({
            path: fullPath,
            name: entry.name,
            type: "directory",
            children
          });
        }
      }
      for (const entry of files) {
        const fullPath = path__namespace.join(dir, entry.name);
        const ext = path__namespace.extname(entry.name).toLowerCase();
        const kind = getFileKind(ext);
        const extension = ext.startsWith(".") ? ext.slice(1) : ext;
        items.push({
          path: fullPath,
          name: entry.name,
          extension,
          type: "file",
          kind
        });
      }
      return items;
    }
    return await scanDirectory(projectPath);
  }
  /**
   * Detect port from launchSettings.json
   */
  async detectPort(projectPath) {
    try {
      const launchSettingsPath = path__namespace.join(
        projectPath,
        "Properties",
        "launchSettings.json"
      );
      const data = await fs__namespace.readFile(launchSettingsPath, "utf-8");
      const launchSettings = JSON.parse(stripBom(data));
      const profile = Object.values(launchSettings.profiles)[0];
      if (profile?.applicationUrl) {
        const match = profile.applicationUrl.match(/:(\d+)/);
        if (match) {
          return parseInt(match[1], 10);
        }
      }
    } catch {
    }
    return 5e3;
  }
  /**
   * Add project to recent projects list
   */
  async addToRecentProjects(project) {
    let recentProjects = await this.getRecentProjects();
    recentProjects = recentProjects.filter((p) => p.path !== project.path);
    recentProjects.unshift({
      name: project.name,
      path: project.path,
      lastOpened: project.lastOpened
    });
    recentProjects = recentProjects.slice(0, 10);
    await fs__namespace.writeFile(
      this.recentProjectsPath,
      JSON.stringify(recentProjects, null, 2),
      "utf-8"
    );
  }
  /**
   * Create project structure based on template
   */
  async createProjectStructure(projectPath, projectName, template) {
    const { execa: execa2 } = await import("execa");
    await execa2("dotnet", ["new", "webapi", "-n", projectName, "-o", projectPath], {
      cwd: path__namespace.dirname(projectPath)
    });
    await execa2("dotnet", ["add", "package", "Minimact.AspNetCore"], {
      cwd: projectPath
    });
    await fs__namespace.mkdir(path__namespace.join(projectPath, "Pages"), { recursive: true });
    await fs__namespace.mkdir(path__namespace.join(projectPath, "Components"), { recursive: true });
    const programCs = `using Minimact.AspNetCore.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddMinimact();

var app = builder.Build();

app.UseMinimact(); // Auto-discovers pages from ./Generated/routes.json

app.Run();
`;
    await fs__namespace.writeFile(path__namespace.join(projectPath, "Program.cs"), programCs, "utf-8");
    const launchSettingsPath = path__namespace.join(projectPath, "Properties", "launchSettings.json");
    const launchSettings = JSON.parse(
      stripBom(await fs__namespace.readFile(launchSettingsPath, "utf-8"))
    );
    const profileName = Object.keys(launchSettings.profiles)[0];
    launchSettings.profiles[profileName].applicationUrl = "http://localhost:5000";
    await fs__namespace.writeFile(launchSettingsPath, JSON.stringify(launchSettings, null, 2), "utf-8");
    if (template === "Counter") {
      await this.createCounterTemplate(projectPath);
    }
  }
  /**
   * Create Counter template files
   */
  async createCounterTemplate(projectPath) {
    const indexTsx = `import { useState } from 'minimact';

export function Index() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
`;
    await fs__namespace.writeFile(path__namespace.join(projectPath, "Pages", "Index.tsx"), indexTsx, "utf-8");
  }
}
function getFileKind(ext) {
  switch (ext) {
    case ".tsx":
      return "tsx";
    case ".jsx":
      return "jsx";
    case ".ts":
      return "ts";
    case ".js":
      return "js";
    case ".cs":
      return "cs";
    case ".csproj":
      return "csproj";
    case ".json":
      return "json";
    default:
      return "other";
  }
}
function stripBom(content) {
  return content.charCodeAt(0) === 65279 ? content.slice(1) : content;
}
class TranspilerService {
  babelPluginPath;
  constructor(babelPluginPath) {
    this.babelPluginPath = babelPluginPath || path__namespace.join(
      __dirname,
      "../../mact_modules/@minimact/babel-plugin/index.cjs"
    );
  }
  /**
   * Transpile a single TSX file to C#
   */
  async transpileFile(tsxPath) {
    const startTime = Date.now();
    try {
      const tsxContent = await fs__namespace.readFile(tsxPath, "utf-8");
      const outputPath = tsxPath.replace(/\.tsx$/, ".cs");
      console.log("[Transpiler] Transpiling:", tsxPath);
      console.log("[Transpiler] Plugin path:", this.babelPluginPath);
      const result = await babel__namespace.transformAsync(tsxContent, {
        filename: tsxPath,
        presets: [
          ["@babel/preset-react", { runtime: "automatic" }],
          "@babel/preset-typescript"
        ],
        plugins: [
          [this.babelPluginPath, {
            target: "csharp",
            framework: "minimact"
          }]
        ]
      });
      if (!result) {
        throw new Error("Transpilation produced no output");
      }
      const csharpCode = result.metadata?.minimactCSharp;
      if (!csharpCode) {
        throw new Error("Transpilation did not generate C# code. Check if the file contains valid Minimact components.");
      }
      await fs__namespace.writeFile(outputPath, csharpCode, "utf-8");
      const duration = Date.now() - startTime;
      return {
        success: true,
        outputPath,
        duration
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error("[Transpiler] Error transpiling:", tsxPath);
      console.error("[Transpiler] Error details:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        duration
      };
    }
  }
  /**
   * Transpile all TSX files in a project
   */
  async transpileProject(projectPath) {
    const startTime = Date.now();
    const errors = [];
    let filesTranspiled = 0;
    async function transpileDirectory(dir, service) {
      const entries = await fs__namespace.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path__namespace.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (!["node_modules", "bin", "obj", ".git", "dist", "out"].includes(entry.name)) {
            await transpileDirectory(fullPath, service);
          }
        } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
          const result = await service.transpileFile(fullPath);
          if (result.success) {
            filesTranspiled++;
          } else {
            errors.push({
              file: fullPath,
              error: result.error || "Unknown error"
            });
          }
        }
      }
    }
    await transpileDirectory(projectPath, this);
    const duration = Date.now() - startTime;
    return {
      success: errors.length === 0,
      filesTranspiled,
      errors,
      duration
    };
  }
}
class ProcessController {
  currentProcess = null;
  outputListeners = [];
  /**
   * Build a Minimact project
   */
  async build(projectPath) {
    const startTime = Date.now();
    try {
      const result = await execa.execa("dotnet", ["build"], {
        cwd: projectPath,
        all: true
      });
      const duration = Date.now() - startTime;
      const output = result.all || "";
      const errors = this.parseErrors(output);
      const warnings = this.parseWarnings(output);
      return {
        success: result.exitCode === 0,
        output,
        errors,
        warnings,
        duration
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      return {
        success: false,
        output: error.all || error.message || "",
        errors: [error.message || "Build failed"],
        warnings: [],
        duration
      };
    }
  }
  /**
   * Start a Minimact app (dotnet run)
   */
  async start(projectPath, port) {
    if (this.currentProcess) {
      throw new Error("A process is already running. Stop it first.");
    }
    this.currentProcess = execa.execa("dotnet", ["run", "--urls", `http://localhost:${port}`], {
      cwd: projectPath,
      all: true,
      buffer: false
    });
    if (this.currentProcess.stdout) {
      this.currentProcess.stdout.on("data", (data) => {
        const text = data.toString();
        this.notifyOutputListeners(text);
      });
    }
    if (this.currentProcess.stderr) {
      this.currentProcess.stderr.on("data", (data) => {
        const text = data.toString();
        this.notifyOutputListeners(text);
      });
    }
    this.currentProcess.on("exit", (code) => {
      this.notifyOutputListeners(`
Process exited with code ${code}
`);
      this.currentProcess = null;
    });
  }
  /**
   * Stop the running process
   */
  stop() {
    if (this.currentProcess) {
      this.currentProcess.kill("SIGTERM");
      this.currentProcess = null;
    }
  }
  /**
   * Check if a process is running
   */
  isRunning() {
    return this.currentProcess !== null;
  }
  /**
   * Register output listener
   */
  onOutput(callback) {
    this.outputListeners.push(callback);
    return () => {
      const index = this.outputListeners.indexOf(callback);
      if (index > -1) {
        this.outputListeners.splice(index, 1);
      }
    };
  }
  /**
   * Notify all output listeners
   */
  notifyOutputListeners(data) {
    for (const listener of this.outputListeners) {
      listener(data);
    }
  }
  /**
   * Parse errors from build output
   */
  parseErrors(output) {
    const errors = [];
    const lines = output.split("\n");
    for (const line of lines) {
      if (line.includes("error CS") || line.includes("error :")) {
        errors.push(line.trim());
      }
    }
    return errors;
  }
  /**
   * Parse warnings from build output
   */
  parseWarnings(output) {
    const warnings = [];
    const lines = output.split("\n");
    for (const line of lines) {
      if (line.includes("warning CS") || line.includes("warning :")) {
        warnings.push(line.trim());
      }
    }
    return warnings;
  }
}
class SignalRClient {
  connection = null;
  eventHandlers = /* @__PURE__ */ new Map();
  /**
   * Connect to SignalR hub
   */
  async connect(url) {
    if (this.connection) {
      await this.disconnect();
    }
    this.connection = new signalR__namespace.HubConnectionBuilder().withUrl(url).withAutomaticReconnect().build();
    for (const [event, handlers] of this.eventHandlers.entries()) {
      for (const handler of handlers) {
        this.connection.on(event, handler);
      }
    }
    await this.connection.start();
  }
  /**
   * Disconnect from SignalR hub
   */
  async disconnect() {
    if (this.connection) {
      await this.connection.stop();
      this.connection = null;
    }
  }
  /**
   * Register event handler
   */
  on(event, callback) {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event).push(callback);
    if (this.connection) {
      this.connection.on(event, callback);
    }
  }
  /**
   * Unregister event handler
   */
  off(event, callback) {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(callback);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
    if (this.connection) {
      this.connection.off(event, callback);
    }
  }
  /**
   * Invoke server method
   */
  async invoke(method, ...args) {
    if (!this.connection) {
      throw new Error("Not connected to SignalR hub");
    }
    return await this.connection.invoke(method, ...args);
  }
  /**
   * Check connection state
   */
  get isConnected() {
    return this.connection?.state === signalR__namespace.HubConnectionState.Connected;
  }
}
function registerProjectHandlers(projectManager2) {
  electron.ipcMain.handle("project:create", async (_, projectPath, template) => {
    try {
      const project = await projectManager2.createProject(projectPath, template);
      return { success: true, data: project };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
  electron.ipcMain.handle("project:load", async (_, projectPath) => {
    try {
      const project = await projectManager2.loadProject(projectPath);
      return { success: true, data: project };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
  electron.ipcMain.handle("project:getRecent", async () => {
    try {
      const projects = await projectManager2.getRecentProjects();
      return { success: true, data: projects };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
  electron.ipcMain.handle("project:scanFiles", async (_, projectPath) => {
    try {
      const files = await projectManager2.scanProjectFiles(projectPath);
      return { success: true, data: files };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
  electron.ipcMain.handle("project:selectDirectory", async () => {
    try {
      const result = await electron.dialog.showOpenDialog({
        properties: ["openDirectory", "createDirectory"],
        title: "Select Project Directory"
      });
      if (result.canceled || result.filePaths.length === 0) {
        return { success: false, error: "No directory selected" };
      }
      return { success: true, data: result.filePaths[0] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
}
function registerTranspilerHandlers(transpilerService2) {
  electron.ipcMain.handle("transpiler:transpileFile", async (_, filePath) => {
    try {
      const result = await transpilerService2.transpileFile(filePath);
      return { success: result.success, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
  electron.ipcMain.handle("transpiler:transpileProject", async (_, projectPath) => {
    try {
      const result = await transpilerService2.transpileProject(projectPath);
      return { success: result.success, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
}
function registerProcessHandlers(processController2) {
  electron.ipcMain.handle("process:build", async (_, projectPath) => {
    try {
      const result = await processController2.build(projectPath);
      return { success: result.success, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
  electron.ipcMain.handle("process:start", async (_, projectPath, port) => {
    try {
      await processController2.start(projectPath, port);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
  electron.ipcMain.handle("process:stop", async () => {
    try {
      processController2.stop();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
  electron.ipcMain.handle("process:isRunning", async () => {
    try {
      const isRunning = processController2.isRunning();
      return { success: true, data: isRunning };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
  electron.ipcMain.handle("process:subscribeOutput", async (event) => {
    const unsubscribe = processController2.onOutput((data) => {
      event.sender.send("process:output", data);
    });
    event.sender.once("destroyed", () => {
      unsubscribe();
    });
    return { success: true };
  });
}
function registerFileHandlers() {
  electron.ipcMain.handle("file:read", async (_, filePath) => {
    try {
      const content = await fs__namespace.readFile(filePath, "utf-8");
      return { success: true, data: content };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
  electron.ipcMain.handle("file:write", async (_, filePath, content) => {
    try {
      await fs__namespace.writeFile(filePath, content, "utf-8");
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
  electron.ipcMain.handle("file:openInEditor", async (_, filePath, editor) => {
    try {
      if (editor) {
        const { execa: execa2 } = await import("execa");
        await execa2(editor, [filePath]);
      } else {
        await electron.shell.openPath(filePath);
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
  electron.ipcMain.handle("file:openExternal", async (_, url) => {
    try {
      await electron.shell.openExternal(url);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
  electron.ipcMain.handle("file:showInFolder", async (_, filePath) => {
    try {
      electron.shell.showItemInFolder(filePath);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
}
function registerTemplateHandlers(signalRClient2) {
  electron.ipcMain.handle("template:getMetadata", async (_event, componentId) => {
    try {
      if (!signalRClient2.isConnected) {
        return {
          success: false,
          error: "Not connected to SignalR hub"
        };
      }
      const metadata = await signalRClient2.invoke("GetComponentMetadata", componentId);
      return {
        success: true,
        data: metadata
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  });
  electron.ipcMain.handle("template:getComponents", async () => {
    try {
      if (!signalRClient2.isConnected) {
        return {
          success: false,
          error: "Not connected to SignalR hub"
        };
      }
      const components = await signalRClient2.invoke("GetAllComponents");
      return {
        success: true,
        data: components
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  });
  electron.ipcMain.handle("template:preview", async (_event, request) => {
    try {
      if (!signalRClient2.isConnected) {
        return {
          success: false,
          error: "Not connected to SignalR hub"
        };
      }
      const preview = await signalRClient2.invoke("PreviewTemplate", request);
      return {
        success: true,
        data: preview
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  });
  electron.ipcMain.handle("template:getUsageStats", async (_event, componentId) => {
    try {
      if (!signalRClient2.isConnected) {
        return {
          success: false,
          error: "Not connected to SignalR hub"
        };
      }
      const stats = await signalRClient2.invoke("GetTemplateUsageStats", componentId);
      return {
        success: true,
        data: stats
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  });
  electron.ipcMain.handle("template:getPerformance", async (_event, componentId) => {
    try {
      if (!signalRClient2.isConnected) {
        return {
          success: false,
          error: "Not connected to SignalR hub"
        };
      }
      const performance = await signalRClient2.invoke("GetTemplatePerformance", componentId);
      return {
        success: true,
        data: performance
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  });
  electron.ipcMain.handle("template:subscribeTelemetry", async (_event, componentId) => {
    try {
      if (!signalRClient2.isConnected) {
        return {
          success: false,
          error: "Not connected to SignalR hub"
        };
      }
      signalRClient2.on("TemplateApplied", (telemetry) => {
        if (!componentId || telemetry.componentId === componentId) {
          _event.sender.send("template:telemetry", telemetry);
        }
      });
      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  });
  electron.ipcMain.handle("template:unsubscribeTelemetry", async () => {
    try {
      signalRClient2.off("TemplateApplied", () => {
      });
      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  });
}
let signalRClient$1 = null;
function registerSignalRHandlers() {
  signalRClient$1 = new SignalRClient();
  electron.ipcMain.handle("signalr:connect", async (_event, url) => {
    try {
      await signalRClient$1.connect(url);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  });
  electron.ipcMain.handle("signalr:disconnect", async () => {
    try {
      await signalRClient$1.disconnect();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  });
  electron.ipcMain.handle("signalr:getComponentTree", async () => {
    try {
      const tree = await signalRClient$1.invoke("GetComponentTree");
      return {
        success: true,
        data: tree
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  });
  electron.ipcMain.handle("signalr:getComponentState", async (_event, componentId) => {
    try {
      const snapshot = await signalRClient$1.invoke("GetComponentState", componentId);
      return {
        success: true,
        data: snapshot
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  });
  electron.ipcMain.handle(
    "signalr:updateComponentState",
    async (_event, componentId, stateKey, value) => {
      try {
        await signalRClient$1.invoke("UpdateComponentState", componentId, stateKey, value);
        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : String(error)
        };
      }
    }
  );
  electron.ipcMain.handle("signalr:getAllComponents", async () => {
    try {
      const components = await signalRClient$1.invoke("GetAllComponents");
      return {
        success: true,
        data: components
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  });
  electron.ipcMain.handle("signalr:triggerRender", async (_event, componentId) => {
    try {
      await signalRClient$1.invoke("TriggerRender", componentId);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  });
  electron.ipcMain.handle("signalr:subscribeStateChanges", async (_event, componentId) => {
    try {
      await signalRClient$1.invoke("SubscribeToComponent", componentId);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  });
  electron.ipcMain.handle("signalr:unsubscribeStateChanges", async (_event, componentId) => {
    try {
      await signalRClient$1.invoke("UnsubscribeFromComponent", componentId);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  });
  electron.ipcMain.handle("signalr:isConnected", async () => {
    return {
      success: true,
      data: signalRClient$1.isConnected
    };
  });
  electron.ipcMain.handle(
    "signalr:previewCascade",
    async (_event, componentId, stateKey, newValue) => {
      try {
        const startTime = Date.now();
        const result = await signalRClient$1.invoke(
          "PreviewStateChangeCascade",
          componentId,
          stateKey,
          newValue
        );
        const computationTime = Date.now() - startTime;
        return {
          success: true,
          data: {
            ...result,
            computationTime
          }
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : String(error)
        };
      }
    }
  );
}
const projectManager = new ProjectManager(electron.app.getPath("userData"));
const transpilerService = new TranspilerService();
const processController = new ProcessController();
const signalRClient = new SignalRClient();
registerProjectHandlers(projectManager);
registerTranspilerHandlers(transpilerService);
registerProcessHandlers(processController);
registerFileHandlers();
registerTemplateHandlers(signalRClient);
registerSignalRHandlers();
let mainWindow = null;
let splashWindow = null;
let splashHideTimeout = null;
const SPLASH_DELAY_MS = 3e3;
function createApplicationMenu() {
  const isMac = process.platform === "darwin";
  const template = [
    ...isMac ? [
      {
        label: electron.app.name,
        submenu: [
          { role: "about" },
          { type: "separator" },
          { role: "services" },
          { type: "separator" },
          { role: "hide" },
          { role: "hideOthers" },
          { role: "unhide" },
          { type: "separator" },
          { role: "quit" }
        ]
      }
    ] : [],
    {
      label: "File",
      submenu: [isMac ? { role: "close" } : { role: "quit" }]
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        ...isMac ? [{ role: "pasteAndMatchStyle" }, { role: "delete" }, { role: "selectAll" }] : [{ role: "delete" }, { role: "selectAll" }]
      ]
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { type: "separator" },
        {
          role: "toggleDevTools",
          accelerator: isMac ? "Alt+Command+I" : "Ctrl+Shift+I"
        },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" }
      ]
    },
    {
      label: "Window",
      submenu: [
        { role: "minimize" },
        { role: "zoom" },
        ...isMac ? [{ type: "separator" }, { role: "front" }, { type: "separator" }, { role: "window" }] : [{ role: "close" }]
      ]
    },
    {
      role: "help",
      submenu: [
        {
          label: "Minimact Docs",
          click: () => electron.shell.openExternal("https://github.com/minimact/minimact")
        }
      ]
    }
  ];
  const menu = electron.Menu.buildFromTemplate(template);
  electron.Menu.setApplicationMenu(menu);
}
function createSplashWindow() {
  splashWindow = new electron.BrowserWindow({
    width: 490,
    height: 700,
    frame: false,
    resizable: false,
    transparent: false,
    alwaysOnTop: true,
    show: false,
    backgroundColor: "#050b12",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      devTools: false
    }
  });
  splashWindow.once("ready-to-show", () => {
    splashWindow?.show();
  });
  splashWindow.on("closed", () => {
    splashWindow = null;
  });
  splashWindow.loadFile(splashPage);
}
function createMainWindow() {
  mainWindow = new electron.BrowserWindow({
    width: 1400,
    height: 900,
    show: false,
    autoHideMenuBar: false,
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });
  mainWindow.once("ready-to-show", () => {
    splashHideTimeout = setTimeout(() => {
      if (splashWindow) {
        splashWindow.close();
      }
      mainWindow?.maximize();
      mainWindow?.show();
      mainWindow?.focus();
    }, SPLASH_DELAY_MS);
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  mainWindow.on("closed", () => {
    if (splashHideTimeout) {
      clearTimeout(splashHideTimeout);
      splashHideTimeout = null;
    }
    mainWindow = null;
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.minimact.swig");
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  createApplicationMenu();
  createSplashWindow();
  createMainWindow();
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.app.on("quit", () => {
  processController.stop();
});

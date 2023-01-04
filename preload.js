const { contextBridge } = require("electron");
const path = require("path");
const fs = require("fs");
const html2pdf = require("html2pdf.js");
const child_process = require("child_process");

contextBridge.exposeInMainWorld("versions", {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld("path", path);
contextBridge.exposeInMainWorld("fs", fs);
contextBridge.exposeInMainWorld("html2pdf", html2pdf);
contextBridge.exposeInMainWorld("child_process", child_process);
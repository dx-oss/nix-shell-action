"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const process_1 = require("process");
const child_process_1 = require("child_process");
const fs_1 = require("fs");
function run() {
    try {
        const interpreter = core.getInput('interpreter');
        const file = core.getInput('file');
        const script = core.getInput('script');
        const scriptPath = `${__dirname}/script.sh`;
        const nixFilePath = `${process_1.cwd()}/${file}`;
        fs_1.writeFileSync(scriptPath, [`#!/usr/bin/env ${interpreter}`, script].join('\n'), { mode: 0o755 });
        child_process_1.execSync(`nix-shell ${nixFilePath} --run ${scriptPath}`, {
            stdio: 'inherit'
        });
    }
    catch (error) {
        core.error(`Error ${error}, action may still succeed though`);
        core.setFailed(error.message);
    }
}
run();

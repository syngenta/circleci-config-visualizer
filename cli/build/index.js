#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const CLIENT_URL = "http://localhost:3000";
const SERVER_PORT = 3001;
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: CLIENT_URL,
        methods: ["GET", "POST"],
    },
});
commander_1.program
    .name("circleci-config-visualizer")
    .version("1.0.0")
    .description("CLI to visualize circleci's config files")
    .requiredOption("-f, --file <filename>", "Specify file to visualize")
    .action((options) => {
    const fileName = options.file;
    const filePath = path_1.default.resolve(process.cwd(), fileName);
    try {
        const data = fs_1.default.readFileSync(filePath, "utf8");
        server.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`));
        openReactApp(data);
    }
    catch (err) {
        console.error("Error reading file:", err.message);
    }
})
    .exitOverride((err) => {
    if (err.code === "commander.missingMandatoryOptionValue") {
        console.error("Error: Missing required argument(s)");
        commander_1.program.outputHelp();
        process.exit(1);
    }
    throw err;
});
try {
    commander_1.program.parse(process.argv);
}
catch (error) {
    commander_1.program.outputHelp();
    process.exit(1);
}
function openReactApp(data) {
    const clientPath = path_1.default.resolve(__dirname, "../..", "client");
    io.on("connection", (socket) => {
        socket.emit("fileData", data);
    });
    (0, child_process_1.exec)("npm start", { cwd: clientPath }, (error, stdout, stderr) => __awaiter(this, void 0, void 0, function* () {
        if (error) {
            console.error(`Error starting React app: ${error}`);
            return;
        }
    }));
}

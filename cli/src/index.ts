#!/usr/bin/env node

import { program } from "commander";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const CLIENT_URL = "http://localhost:3000";
const SERVER_PORT = 3001;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

program
  .name("circleci-config-visualizer")
  .version("1.0.0")
  .description("CLI to visualize circleci's config files")
  .requiredOption("-f, --file <filename>", "Specify file to visualize")
  .action((options) => {
    const fileName = options.file;
    const filePath = path.resolve(process.cwd(), fileName);
    try {
      const data = fs.readFileSync(filePath, "utf8");
      server.listen(SERVER_PORT, () =>
        console.log(`Server running on port ${SERVER_PORT}`)
      );
      openReactApp(data);
    } catch (err: any) {
      console.error("Error reading file:", err.message);
    }
  })
  .exitOverride((err) => {
    if (err.code === "commander.missingMandatoryOptionValue") {
      console.error("Error: Missing required argument(s)");
      program.outputHelp();
      process.exit(1);
    }
    throw err;
  });

try {
  program.parse(process.argv);
} catch (error: any) {
  program.outputHelp();
  process.exit(1);
}

function openReactApp(data: any) {
  const clientPath = path.resolve(__dirname, "../..", "client");

  io.on("connection", (socket: Socket) => {
    socket.emit("fileData", data);
  });

  exec("npm start", { cwd: clientPath }, async (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting React app: ${error}`);
      return;
    }
  });
}

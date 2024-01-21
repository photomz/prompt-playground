/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from "blockly";
import { blocks } from "./blocks/text";
import { forBlock } from "./generators/javascript";
import { javascriptGenerator } from "blockly/javascript";
import { save, load } from "./serialization";
import { toolbox } from "./toolbox";
import OpenAI from "openai";
// Globval scope so blocks can access without importing
window.OpenAI = OpenAI;

import "./index.css";

// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(blocks);
Object.assign(javascriptGenerator.forBlock, forBlock);

// Set up UI elements and inject Blockly
const codeDiv = document.getElementById("generatedCode").firstChild;
const outputDiv = document.getElementById("output");
const outputPane = document.querySelector("#outputPane");
const blocklyDiv = document.getElementById("blocklyDiv");
const ws = Blockly.inject(blocklyDiv, { toolbox });

// This function resets the code and output divs, shows the
// generated code from the workspace, but doesn't eval the code.
const updatecode = () => {
  const code = javascriptGenerator.workspaceToCode(ws);
  codeDiv.innerText = code;

  outputDiv.innerHTML = "";
};

// Load the initial state from storage and run the code.
load(ws);

// Create a run button in blocklyDiv to run code
const runButton = document.createElement("button");
runButton.innerText = "Run";
// Run code here
runButton.onclick = () => eval(codeDiv.innerText);
outputPane.insertBefore(runButton, outputPane.firstChild);

// Every time the workspace changes state, save the changes to storage.
ws.addChangeListener((e) => {
  // UI events are things like scrolling, zooming, etc.
  // No need to save after one of these.
  if (e.isUiEvent) return;
  save(ws);
});

// Whenever the workspace changes meaningfully, run the code again.
ws.addChangeListener((e) => {
  // Don't run the code when the workspace finishes loading; we're
  // already running it once when the application starts.
  // Don't run the code during drags; we might have invalid state.
  if (
    e.isUiEvent ||
    e.type == Blockly.Events.FINISHED_LOADING ||
    ws.isDragging()
  ) {
    return;
  }
  updatecode();
});

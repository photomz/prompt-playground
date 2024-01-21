/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from "blockly/core";

// Create a custom block called 'add_text' that adds
// text to the output div on the sample app.
// This is just an example and you should replace this with your
// own custom blocks.
const addText = {
  type: "add_text",
  message0: "Add text %1 with color %2",
  args0: [
    {
      type: "input_value",
      name: "TEXT",
      check: "String",
    },
    {
      type: "input_value",
      name: "COLOR",
      check: "Colour",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 160,
  tooltip: "",
  helpUrl: "",
};

const openAIQuery = {
  type: "openai_query",
  message0: "Ask OpenAI %1 with API key %2",
  args0: [
    {
      type: "input_value",
      name: "QUERY",
      check: "String",
    },
    {
      type: "input_value",
      name: "API_KEY",
      check: "String",
    },
  ],
  output: "String", // This line indicates that the block returns a string
  colour: 230,
  tooltip: "Sends a query to the OpenAI API and returns the response.",
  helpUrl: "https://openai.com/api/",
};

const printBlock = {
  type: "print",
  message0: "Print %1",
  args0: [
    {
      type: "input_value",
      name: "TEXT",
      check: "String",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 160,
  tooltip: "Prints the input to the console.",
  helpUrl: "",
};

const asyncBlock = {
  type: "async_block",
  message0: "async %1",
  args0: [
    {
      type: "input_statement",
      name: "DO",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 230,
  tooltip: "Executes contained blocks asynchronously.",
  helpUrl: "",
};

const awaitBlock = {
  type: "await",
  message0: "await %1",
  args0: [
    {
      type: "input_value",
      name: "TEXT",
      check: "String",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 230,
  output: "String", // This line indicates that the block returns a string
  tooltip: "awaits a value",
  helpUrl: "",
};

// Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  addText,
  openAIQuery,
  printBlock,
  asyncBlock,
  awaitBlock,
]);

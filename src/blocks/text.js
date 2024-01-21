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

const openAIEmbedding = {
  type: "openai_embed",
  message0: "Embed OpenAI %1 with API key %2",
  args0: [
   {
      type: "input_value",
      name: "TEXT",
      check: "String",
    },
    {
      type: "input_value",
      name: "API_KEY",
      check: "String",
    },
  ],
  output: "Array",
  colour: 230,
  tooltip: "Get the OpenAI vector embedding of the input text",
  helpUrl: "",
};

const setupPinecone = {
  type: "setup_pinecone",
  message0: "Setup Pinecone with API Key %1 and Index Name %2",
  args0: [
    {
      type: "input_value",
      name: "API_KEY",
      check: "String",
    },
    {
      type: "input_value",
      name: "INDEX_NAME",
      check: "String",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 230,
  tooltip: "Setup Pinecone with the provided API Key and Index Name",
  helpUrl: "",
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
  type: "async",
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

// 'role' block takes text input and outputs harcoded: "You are a {text}"
const roleBlock = {
  type: "role",
  message0: "You are a %1",
  args0: [
    {
      type: "input_value",
      name: "TEXT",
      check: "String",
    },
  ],
  output: "String", // This line indicates that the block returns a string
  colour: 230,
  tooltip:
    "Your AI's persona/role. If it were a person, what job would it hold?",
  helpUrl: "",
};

// 'rule' block takes a list of text inputs and outputs "You will: \n-{text1}\n-{text2}\n-{text3} ..."
const ruleBlock = {
  type: "rule",
  message0: "You will: %1",
  args0: [
    {
      type: "input_value",
      name: "TEXT",
      check: "String",
    },
  ],
  output: "String", // This line indicates that the block returns a string
  colour: 230,
  tooltip: "What rules must your AI follow?",
  helpUrl: "",
};

const queryPinecone = {
  type: "query_pinecone",
  message0: "Query Pinecone %1",
  args0: [
    {
      type: "input_value",
      name: "VECTOR",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 230,
  tooltip: "Query Pinecone with the provided vector",
  helpUrl: "",
  output: "String"
};

// Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  addText,
  openAIQuery,
  openAIEmbedding,
  printBlock,
  asyncBlock,
  awaitBlock,
  roleBlock,
  ruleBlock,
  setupPinecone,
  queryPinecone
]);

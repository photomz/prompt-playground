/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { Order } from "blockly/javascript";

// Export all the code generators for our custom blocks,
// but don't register them with Blockly yet.
// This file has no side effects!
export const forBlock = Object.create(null);

forBlock["add_text"] = function (block, generator) {
  const text = generator.valueToCode(block, "TEXT", Order.NONE) || "''";
  const color =
    generator.valueToCode(block, "COLOR", Order.ATOMIC) || "'#ffffff'";

  const addText = generator.provideFunction_(
    "addText",
    `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(text, color) {

  // Add text to the output area.
  const outputDiv = document.getElementById('output');
  const textEl = document.createElement('p');
  textEl.innerText = text;
  textEl.style.color = color;
  outputDiv.appendChild(textEl);
}`
  );
  // Generate the function call for this block.
  const code = `${addText}(${text}, ${color});\n`;
  return code;
};

forBlock["openai_query"] = function (block, generator) {
  const apiKey = generator.valueToCode(block, "API_KEY", Order.NONE) || "''";
  const query = generator.valueToCode(block, "QUERY", Order.NONE) || "''";

  const openAIQueryFunction = generator.provideFunction_(
    "openAIQueryFunction",
    `
async function ${generator.FUNCTION_NAME_PLACEHOLDER_}(apiKey, query) {
  const openai = new window.OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true 
  });
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: query }],
    model: 'gpt-3.5-turbo',
  });
  console.log(chatCompletion);
  return chatCompletion.choices[0].message.content;
}`
  );

  // Return a promise that resolves with the result of the OpenAI API call
  const code = `${openAIQueryFunction}(${apiKey}, ${query})`;
  return [code, Order.NONE];
};

forBlock["print"] = function (block, generator) {
  const text = generator.valueToCode(block, "TEXT", Order.NONE) || "''";

  // Handle promise input
  const code = `console.log(${text});\n`;

  return code;
};

forBlock["async_block"] = function (block, generator) {
  const statementsDo = generator.statementToCode(block, "DO");

  // Generate the anonymous async function.
  const code = `(async () => {
    try {
      ${statementsDo}
    } catch (error) {
      console.error('Error in async operation:', error);
      throw error;
    }
  })();\n`;
  return code;
};

forBlock["await"] = function (block, generator) {
  const expression = generator.valueToCode(block, "TEXT", Order.NONE) || "''";

  // Generate the anonymous async function.
  const code = `await ${expression}`;
  return [code, Order.NONE];
};

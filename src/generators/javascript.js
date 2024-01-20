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
    `async function ${generator.FUNCTION_NAME_PLACEHOLDER_}(apiKey, query) {
  const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey
    },
    body: JSON.stringify({prompt: query, max_tokens: 150})
  });

  const data = await response.json();
  return data.choices[0].text;
}`
  );

  // Return a promise that resolves with the result of the OpenAI API call
  const code = `${openAIQueryFunction}(${apiKey}, ${query})`;
  return [code, Order.NONE];
};

forBlock["print"] = function (block, generator) {
  const text = generator.valueToCode(block, "TEXT", Order.NONE) || "''";

  // Handle promise input
  const code = `(async () => {
    const output = await ${text};
    console.log(output);
  })();\n`;

  return code;
};

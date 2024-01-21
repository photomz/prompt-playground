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
  return chatCompletion.choices[0].message.content;
}`
  );

  // Return a promise that resolves with the result of the OpenAI API call
  const code = `${openAIQueryFunction}(${apiKey}, ${query})`;
  return [code, Order.NONE];
};

forBlock["openai_embed"] = function (block, generator) {
  const apiKey = generator.valueToCode(block, "API_KEY", Order.NONE) || "''";
  const text = generator.valueToCode(block, "TEXT", Order.NONE) || "''";

  const openAIEmbeddingFunction = generator.provideFunction_(
    "openAIEmbeddingFunction",
    `
async function ${generator.FUNCTION_NAME_PLACEHOLDER_}(apiKey, text) {
  const openai = new window.OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true 
  });
  const embedding = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
    encoding_format: "float",
  });
  return embedding.data[0].embedding;
}`
  );

  // Return a promise that resolves with the result of the OpenAI API call
  const code = `${openAIEmbeddingFunction}(${apiKey}, ${text})`;
  return [code, Order.NONE];
};

forBlock["print"] = function (block, generator) {
  const text = generator.valueToCode(block, "TEXT", Order.NONE) || "''";

  // Handle promise input
  const code = `console.log(${text});\n`;

  return code;
};

forBlock["async"] = function (block, generator) {
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
  const expression = generator.valueToCode(block, "TEXT", Order.NONE) || "";

  // Generate the anonymous async function.
  const code = `await ${expression}`;
  return [code, Order.NONE];
};

// 'role' block takes text input and outputs harcoded: "You are a {text}"
forBlock["role"] = function (block, generator) {
  const text = generator.valueToCode(block, "TEXT", Order.NONE) || "''";
  const code = `\`You are a ${text}\``;
  return [code, Order.NONE];
};

// 'rule' block takes a list of text inputs and outputs "You will: \n-{text1}\n-{text2}\n-{text3} ..."
forBlock["rule"] = function (block, generator) {
  const text = generator.valueToCode(block, "TEXT", Order.NONE) || "''";
  const code = `\`You will: ${text}\``;
  return [code, Order.NONE];
};

forBlock["setup_pinecone"] = function (block, generator) {
  const apiKey = generator.valueToCode(block, "API_KEY", Order.NONE) || "''";
  const indexName = generator.valueToCode(block, "INDEX_NAME", Order.NONE) || "''";

  const code = `
    const apiKey = ${apiKey};
    const indexName = ${indexName};
    const client = new window.Pinecone({ apiKey }).index(indexName);
  `;
  return code;
};

forBlock["query_pinecone"] = function (block, generator) {
  const vector = generator.valueToCode(block, "VECTOR", Order.NONE) || "[]";

  const searchVectorsFunction = generator.provideFunction_(
    "searchVectorsFunction",
    `
    async function ${generator.FUNCTION_NAME_PLACEHOLDER_}(vector) {
      try {
        const result = await client.query({ vector: await vector, topK: 5, includeMetadata: true });
        const example = result.matches[0].metadata.toString();
        console.log(example);
        return example;
      } catch (error) {
        console.error('Error searching vectors:', error);
      }
    }
  `);

  const code = `${searchVectorsFunction}(${vector})`;

  return [code, Order.NONE];
};
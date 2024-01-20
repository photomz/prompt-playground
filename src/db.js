const { Pinecone } = require('@pinecone-database/pinecone');
require('dotenv').config();
console.log(process.env.PINECONE_API_KEY); // Should output your API key if loaded correctly


const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY // Make sure the environment variable name matches
});

const index = pc.index('quickstart');
// Continue with your operations on the 'index'

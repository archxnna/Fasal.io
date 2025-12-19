const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function listModels() {
  try {
    console.log('Listing available Gemini models...');
    
    const apiKey = process.env.GEMINI_API_KEY || "AIzaSyDeq38ArXcvYMdAedBJRNlx1gHKaSsB7Dc";
    console.log(`API Key: ${apiKey.substring(0, 10)}...`);
    
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const models = await genAI.listModels();
    
    console.log('Available models:');
    models.forEach(model => {
      console.log(`- ${model.name} (${model.displayName})`);
      console.log(`  Supported methods: ${model.supportedGenerationMethods?.join(', ')}`);
    });
    
    return true;
  } catch (error) {
    console.error('❌ FAILED! Error listing models:');
    console.error('Error message:', error.message);
    console.error('Error details:', error);
    return false;
  }
}

// Run the test
listModels().then(success => {
  if (success) {
    console.log('\n✅ Models listed successfully!');
  } else {
    console.log('\n💥 Failed to list models.');
  }
  process.exit(success ? 0 : 1);
});
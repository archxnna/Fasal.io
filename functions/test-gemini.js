const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function testGeminiAPI() {
  try {
    console.log('Testing Gemini API...');
    
    const apiKey = process.env.GEMINI_API_KEY || "AIzaSyDeq38ArXcvYMdAedBJRNlx1gHKaSsB7Dc";
    console.log(`API Key: ${apiKey.substring(0, 10)}...`);
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const prompt = "Say 'Hello! Gemini API is working perfectly!' in a friendly way.";
    
    console.log('Sending test prompt to Gemini...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ SUCCESS! Gemini API Response:');
    console.log(text);
    
    return true;
  } catch (error) {
    console.error('❌ FAILED! Gemini API Error:');
    console.error('Error message:', error.message);
    console.error('Error details:', error);
    return false;
  }
}

// Run the test
testGeminiAPI().then(success => {
  if (success) {
    console.log('\n🎉 Gemini API is working correctly!');
  } else {
    console.log('\n💥 Gemini API test failed. Check your API key and network connection.');
  }
  process.exit(success ? 0 : 1);
});
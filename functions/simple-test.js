const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testSimpleGemini() {
  try {
    console.log('Testing simple Gemini...');
    
    const apiKey = "AIzaSyDeq38ArXcvYMdAedBJRNlx1gHKaSsB7Dc";
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "models/gemini-pro" });
    
    const disease = "Early Blight";
    const confidence = 75;
    
    const prompt = `Provide farming advice for plant disease: ${disease} (${confidence}% confidence).

Give practical recommendations in this format:

🔍 Disease: ${disease}
📊 Confidence: ${confidence}%

🌱 What to do:
- Immediate actions
- Treatment options
- Prevention tips

⚠️ Important notes

Keep it simple and practical for farmers.`;

    console.log('Sending prompt to Gemini...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ SUCCESS! Gemini Response:');
    console.log(text);
    
    return true;
  } catch (error) {
    console.error('❌ FAILED!', error.message);
    return false;
  }
}

testSimpleGemini();
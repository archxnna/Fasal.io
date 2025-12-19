const { onCall } = require("firebase-functions/v2/https");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { defineSecret } = require("firebase-functions/params");

// Define secret for Gemini API key
const geminiApiKey = defineSecret("GEMINI_API_KEY");

// Initialize Gemini AI with environment variable
const getGeminiAI = () => {
  const apiKey = process.env.GEMINI_API_KEY || geminiApiKey.value();
  if (!apiKey) {
    throw new Error('Gemini API key not configured');
  }
  return new GoogleGenerativeAI(apiKey);
}; // Replace with your actual API key

// Generate comprehensive recommendations using Gemini AI only
async function generateRecommendations(disease, confidence) {
  const genAI = getGeminiAI();
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `You are an agricultural education expert.

This content is for awareness and learning purposes only.
Do NOT provide chemical dosages or brand names.

Explain the plant disease "${disease}" (detected with ${confidence}% confidence) using the following structured format:

1. Disease Overview (detailed)
2. Scientific Cause & Life Cycle
3. Environmental Conditions Favoring Disease
4. Symptoms (Early vs Advanced)
5. Commonly Recommended Management Practices (non-prescriptive)
6. Why These Practices Are Effective (scientific reasoning)
7. Preventive Measures (best practices)
8. Consequences If Ignored
9. Learning Summary (key takeaways)

Return clear, detailed explanations under each section. Write comprehensive content with scientific accuracy for educational purposes. Each section should be thorough and informative to help users understand the disease and general management approaches.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

exports.getPlantRecommendations = onCall(
  { secrets: [geminiApiKey] },
  async (request) => {
  const { disease, confidence } = request.data;
  
  if (!disease) {
    throw new Error('No disease information provided');
  }

  console.log(`Getting recommendations for: ${disease}`);
  
  const recommendations = await generateRecommendations(disease, confidence);
  
  const detailedRecommendations = `${recommendations}\n\n📊 DETECTION CONFIDENCE: ${confidence}%\n\n⚠️ DISCLAIMER: This is an AI-powered analysis. For serious plant health issues, consult with local agricultural experts or extension services.`;

  console.log('SUCCESS! Gemini AI recommendations generated');

  return {
    success: true,
    disease: disease,
    confidence: confidence,
    recommendations: detailedRecommendations,
    isHealthy: disease.toLowerCase() === 'healthy'
  };
});
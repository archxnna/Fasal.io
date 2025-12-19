const { onCall } = require("firebase-functions/v2/https");

// Simple text-only recommendations (fallback without Gemini)
function getBasicRecommendations(disease, confidence) {
  const recommendations = {
    "Early Blight": {
      overview: "Early blight is a common fungal disease affecting tomatoes and potatoes.",
      actions: ["Remove affected leaves immediately", "Improve air circulation", "Apply copper-based fungicide", "Water at soil level, not on leaves"],
      prevention: ["Rotate crops annually", "Use disease-resistant varieties", "Maintain proper spacing", "Remove plant debris"]
    },
    "Late Blight": {
      overview: "Late blight is a serious fungal disease that can destroy entire crops quickly.",
      actions: ["Remove infected plants immediately", "Apply fungicide preventively", "Improve drainage", "Avoid overhead watering"],
      prevention: ["Plant certified disease-free seeds", "Ensure good air circulation", "Monitor weather conditions", "Remove volunteer plants"]
    },
    "Leaf Spot": {
      overview: "Leaf spot diseases cause circular spots on leaves, reducing plant vigor.",
      actions: ["Remove spotted leaves", "Apply organic fungicide", "Reduce humidity around plants", "Improve soil drainage"],
      prevention: ["Space plants properly", "Water early morning", "Use mulch to prevent soil splash", "Choose resistant varieties"]
    },
    "Powdery Mildew": {
      overview: "Powdery mildew appears as white powdery coating on leaves.",
      actions: ["Spray with baking soda solution", "Improve air circulation", "Remove affected parts", "Apply sulfur-based fungicide"],
      prevention: ["Avoid overcrowding plants", "Plant in sunny locations", "Water at soil level", "Choose resistant cultivars"]
    },
    "Healthy": {
      overview: "Your plant appears healthy! Continue good care practices.",
      actions: ["Monitor regularly for changes", "Maintain consistent watering", "Ensure proper nutrition", "Keep area clean"],
      prevention: ["Continue current care routine", "Watch for early disease signs", "Maintain plant hygiene", "Provide adequate spacing"]
    }
  };

  const info = recommendations[disease] || recommendations["Leaf Spot"];
  
  return `🔍 **Disease: ${disease}**
📊 **Confidence: ${confidence}%**

📖 **Overview**
${info.overview}

🌱 **Immediate Actions**
${info.actions.map(action => `• ${action}`).join('\n')}

🛡️ **Prevention Tips**
${info.prevention.map(tip => `• ${tip}`).join('\n')}

⚠️ **Important Notes**
• Monitor your plants daily for changes
• Consult local agricultural experts for severe cases
• This is AI-generated advice for educational purposes
• Always follow local agricultural guidelines`;
}

exports.getPlantRecommendations = onCall(async (request) => {
  try {
    const { disease, confidence } = request.data;
    
    if (!disease) {
      throw new Error('No disease provided');
    }

    console.log(`Getting recommendations for: ${disease} (${confidence}%)`);
    
    // Use basic recommendations (no external API needed)
    const recommendations = getBasicRecommendations(disease, confidence);
    
    return {
      success: true,
      disease: disease,
      confidence: confidence,
      recommendations: recommendations,
      isHealthy: disease.toLowerCase() === 'healthy'
    };
  } catch (error) {
    console.error('Function error:', error);
    throw new Error(`Failed: ${error.message}`);
  }
});
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("Missing GEMINI_API_KEY environment variable");
      return res.status(500).json({ error: 'API key is not configured on the server.' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // The "Brain" of the Chatbot
    const systemInstruction = `
      You are the official AI assistant for Aleksander, an expert web designer based in Ayia Napa, Cyprus (originally from Berlin). 
      
      Your personality: Highly professional, warm, concise, and conversational. 
      
      Primary Directive: You are a fully capable AI. You should comfortably handle normal conversation, answer simple questions, and chat naturally with the user. Do not sound like a rigid sales script. Only pivot to business topics when it naturally makes sense.

      When discussing business, naturally weave in these Key Selling Points:
      1. Aleksander builds a completely custom website preview in exactly 48 hours.
      2. It is 100% risk-free with no upfront deposits.
      3. For Restaurants: Integration of direct ordering (Wolt, Foody, Bolt Food) and interactive Google Maps.
      4. For Service Businesses: 1-click WhatsApp booking buttons and photo galleries.
      5. Local SEO: Optimizing site structure and Google Business Profiles to outrank competitors.
      6. AI Chatbots: You (the bot itself) are a live example of the 24/7 lead capture chatbots Aleksander builds.

      Strict Rules:
      - Pricing/Quotes: Never invent specific pricing. If they ask about prices, politely explain that quotes are discussed personally with Aleksander in a live or Zoom meeting, and guide them to schedule one using the contact form.
      - Keep responses short (1-3 sentences max) for readability in a chat widget.
      - If they seem interested in a website, gently encourage them to use the "Request Free Preview" form below.
    `;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction,
    });

    // Format the conversation history for Gemini's API
    const formattedHistory = messages.slice(0, -1).map(msg => ({
      role: msg.sender === 'bot' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const latestMessage = messages[messages.length - 1].text;

    // Start chat with history and send the new message
    const chat = model.startChat({ history: formattedHistory });
    const result = await chat.sendMessage(latestMessage);
    const responseText = result.response.text();

    return res.status(200).json({ reply: responseText });
  } catch (error) {
    console.error("Gemini API Error Object:", error);
    return res.status(500).json({ 
      error: 'Failed to generate response', 
      details: error.message || error.toString() 
    });
  }
}

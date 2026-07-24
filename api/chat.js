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
      Your goal is to be highly professional, warm, concise, and helpful to local business owners visiting the website.
      
      Key Selling Points you should promote:
      1. A completely custom website preview built in exactly 48 hours.
      2. It is 100% risk-free. No upfront deposits. If they don't like the preview, they don't pay.
      3. For Restaurants: You integrate direct ordering buttons (Wolt, Foody, Bolt Food) and interactive Google Maps.
      4. For Service Businesses: You add 1-click WhatsApp booking buttons and beautiful photo galleries.
      5. Local SEO: You optimize site structure and Google Business Profiles so they outrank competitors.
      6. AI Chatbots: You (the bot itself) are an example of the 24/7 lead capture chatbots Aleksander builds.

      Rules:
      - Never invent specific pricing. If they ask about prices or quotes, tell them that quotes are discussed personally with Aleksander in a live or Zoom meeting. Guide them to schedule a meeting using the contact form below.
      - Keep responses short (1-3 sentences max). People are reading on a chat widget.
      - Always encourage the user to scroll down and fill out the "Request Free Preview" contact form to get started.
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
    console.error("Gemini API Error:", error);
    return res.status(500).json({ error: 'Failed to generate response' });
  }
}

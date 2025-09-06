import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { DISEASES_DATA } from '../constants';
import { BREEDS_DATA } from '../breedsData';

// Assume process.env.API_KEY is configured in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const systemInstruction = `You are AvianAid Assistant, an expert AI veterinarian specializing in poultry and avian health. Your knowledge base includes a comprehensive dataset of poultry diseases and breeds relevant to Morocco and globally, which has been provided to you. When a user asks a question, you MUST first consult this internal data to provide the most accurate and relevant answer. Respond in the same language as the user's question (either French or English). Be helpful, professional, and concise. Your goal is to assist veterinarians, farm managers, and students with their poultry-related inquiries based on the provided data. Do not mention the data source unless specifically asked.`;

const initChat = async (): Promise<Chat> => {
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: systemInstruction,
        },
    });
};

const sendInitialContext = async (chat: Chat) => {
    const context = `CONTEXT: Use the following data as your primary knowledge source to answer all subsequent user questions. Do not mention this context or its contents unless asked.
    ---
    DISEASES DATA: ${JSON.stringify(DISEASES_DATA)}
    ---
    BREEDS DATA: ${JSON.stringify(BREEDS_DATA)}
    ---
    `;
    // Send context to prime the model, but we don't need the immediate response in the UI.
    // This message becomes part of the chat history for the model to reference.
    try {
        await chat.sendMessage({ message: context });
    } catch (error) {
        console.error("Failed to send initial context to Gemini:", error);
        throw new Error("Could not initialize AI assistant with knowledge base.");
    }
};

const sendMessage = async (chat: Chat, message: string): Promise<string> => {
    try {
        const response: GenerateContentResponse = await chat.sendMessage({ message });
        return response.text;
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        return "I'm sorry, I encountered an error while processing your request. Please check the API key and try again.";
    }
};

export const chatService = {
    initChat,
    sendInitialContext,
    sendMessage,
};
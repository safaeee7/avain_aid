import React, { useState, useEffect, useRef } from 'react';
import type { Chat } from '@google/genai';
import { chatService } from '../services/chatService';
import { MessageCircleIcon, XIcon, SendIcon } from './Icons';

interface Message {
    role: 'user' | 'model';
    text: string;
}

const ChatAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: "Hello! I'm the AvianAid Assistant. How can I help you with your poultry health questions today? (Bonjour! Je suis l'assistant AvianAid. Comment puis-je vous aider?)" }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initializeChat = async () => {
            if (!chatRef.current) {
                const chatSession = await chatService.initChat();
                // Prime the model with the app's internal data for RAG
                await chatService.sendInitialContext(chatSession);
                chatRef.current = chatSession;
            }
        };
        initializeChat();
    }, []);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleToggle = () => setIsOpen(!isOpen);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading || !chatRef.current) return;

        const userMessage: Message = { role: 'user', text: userInput };
        setMessages(prev => [...prev, userMessage]);
        setUserInput('');
        setIsLoading(true);

        try {
            const response = await chatService.sendMessage(chatRef.current, userMessage.text);
            const modelMessage: Message = { role: 'model', text: response };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMessage: Message = { role: 'model', text: "Sorry, I'm having trouble connecting right now. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 left-6 w-80 md:w-96 h-[32rem] bg-white rounded-xl shadow-2xl flex flex-col z-50 animate-slideInUp">
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 bg-[#8A9B6C] text-white rounded-t-xl">
                        <h3 className="font-bold text-lg">AvianAid Assistant</h3>
                        <button onClick={handleToggle} className="p-1 rounded-full hover:bg-white/20">
                            <XIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
                        <div className="space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                        <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="p-3 rounded-lg bg-gray-200 text-gray-800">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                             <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-200">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Ask a question..."
                                className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#8A9B6C]"
                                disabled={isLoading}
                            />
                            <button type="submit" disabled={isLoading} className="p-3 bg-[#8A9B6C] text-white rounded-full hover:bg-green-700 disabled:bg-gray-400">
                                <SendIcon className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={handleToggle}
                className="fixed bottom-6 left-6 w-16 h-16 bg-[#8A9B6C] text-white rounded-full shadow-lg flex items-center justify-center z-50 transform hover:scale-110 transition-transform"
                aria-label="Toggle Chat Assistant"
            >
                {isOpen ? <XIcon className="w-8 h-8" /> : <MessageCircleIcon className="w-8 h-8" />}
            </button>
        </>
    );
};

export default ChatAssistant;
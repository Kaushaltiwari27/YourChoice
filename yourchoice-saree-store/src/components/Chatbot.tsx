import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Minimize2,
  Maximize2
} from 'lucide-react';

import { AppPage } from '../types';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

interface ChatbotProps {
  onNavigate?: (page: AppPage) => void;
}

const QUICK_REPLIES = [
  'Show me silk sarees',
  'What\'s on sale?',
  'Size guide',
  'Delivery info',
  'Return policy'
];

export default function Chatbot({ onNavigate }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(
          'Hello! Welcome to YourChoice! 👋 How can I help you find the perfect saree today?',
          QUICK_REPLIES
        );
      }, 500);
    }
  }, [isOpen, isMinimized]);

  const addBotMessage = (text: string, suggestions?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date(),
      suggestions
    };
    setMessages(prev => [...prev, newMessage]);
    setIsTyping(false);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getBotResponse = (userMessage: string): { text: string; suggestions?: string[] } => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('silk')) {
      return {
        text: 'Our silk sarees are absolutely stunning! We have premium Banarasi silk, soft silk, and designer silk sarees starting from ₹8,999. Would you like to see our silk collection?',
        suggestions: ['Show silk sarees', 'Banarasi collection', 'Price range']
      };
    }
    
    if (message.includes('sale') || message.includes('discount')) {
      return {
        text: 'Great news! We have amazing discounts right now! Up to 30% off on selected sarees, plus free shipping on orders above ₹2,000.',
        suggestions: ['Show sale items', 'Free shipping details', 'Current offers']
      };
    }
    
    if (message.includes('size')) {
      return {
        text: 'Our sarees come in standard length (6-6.5 meters) with blouse pieces included. For blouse sizes, we offer S, M, L, XL.',
        suggestions: ['Blouse sizes', 'How to measure', 'Size chart']
      };
    }
    
    if (message.includes('delivery') || message.includes('shipping')) {
      return {
        text: 'We offer fast delivery across India! Free shipping on orders above ₹2,000, otherwise ₹99. Orders arrive within 3-7 business days.',
        suggestions: ['Track order', 'Delivery charges', 'Express delivery']
      };
    }
    
    if (message.includes('return') || message.includes('refund')) {
      return {
        text: 'We have a customer-friendly 7-day return policy! Return any saree in original condition for a full refund.',
        suggestions: ['How to return', 'Return policy', 'Refund process']
      };
    }
    
    return {
      text: 'I\'d love to help you with that! Are you looking for something specific? I can recommend sarees based on occasion, color, fabric, or budget.',
      suggestions: QUICK_REPLIES
    };
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    addUserMessage(inputText);
    setInputText('');
    setIsTyping(true);
    
    setTimeout(() => {
      const response = getBotResponse(inputText);
      addBotMessage(response.text, response.suggestions);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    addUserMessage(reply);
    setIsTyping(true);
    
    setTimeout(() => {
      const response = getBotResponse(reply);
      addBotMessage(response.text, response.suggestions);
    }, 800);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-12 w-12 sm:h-14 sm:w-14 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
        >
          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className={`w-80 sm:w-96 transition-all duration-300 shadow-xl ${
        isMinimized ? 'h-16' : 'h-96 sm:h-[500px]'
      }`}>
        <CardHeader className="flex flex-row items-center justify-between p-3 sm:p-4 bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="h-3 w-3 sm:h-5 sm:w-5" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold">YourChoice Assistant</CardTitle>
              <p className="text-xs opacity-90">Always here to help!</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-primary-foreground hover:bg-white/20"
            >
              {isMinimized ? <Maximize2 className="h-3 w-3 sm:h-4 sm:w-4" /> : <Minimize2 className="h-3 w-3 sm:h-4 sm:w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-primary-foreground hover:bg-white/20"
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </CardHeader>
        
        {!isMinimized && (
          <CardContent className="flex flex-col h-full p-0">
            <ScrollArea className="flex-1 p-3 sm:p-4">
              <div className="space-y-3 sm:space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-2">
                    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex items-start space-x-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                          {message.sender === 'user' ? <User className="h-2 w-2 sm:h-3 sm:w-3" /> : <Bot className="h-2 w-2 sm:h-3 sm:w-3" />}
                        </div>
                        <div className={`rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                          <p>{message.text}</p>
                        </div>
                      </div>
                    </div>
                    
                    {message.suggestions && (
                      <div className="flex flex-wrap gap-1 sm:gap-2 ml-6 sm:ml-8">
                        {message.suggestions.map((suggestion, index) => (
                          <Badge 
                            key={index}
                            variant="outline" 
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-xs"
                            onClick={() => handleQuickReply(suggestion)}
                          >
                            {suggestion}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2 max-w-[85%]">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-muted">
                        <Bot className="h-2 w-2 sm:h-3 sm:w-3" />
                      </div>
                      <div className="rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm bg-muted">
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-muted-foreground rounded-full animate-bounce" />
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>
            
            <div className="border-t p-3 sm:p-4">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 text-sm"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  disabled={!inputText.trim() || isTyping}
                  className="px-2 sm:px-3"
                >
                  <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
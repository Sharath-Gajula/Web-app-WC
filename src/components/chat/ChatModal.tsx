import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Paperclip, Image, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  workerId: string;
  workerName: string;
}

interface Message {
  id: string;
  content: string;
  sender: "customer" | "worker";
  timestamp: Date;
  type: "text" | "image";
  imageUrl?: string;
}

// Mock messages - in real app, this would come from your backend
const mockMessages: Message[] = [
  {
    id: "1",
    content: "Hi! I'm interested in your electrical services. Do you provide home wiring?",
    sender: "customer",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    type: "text"
  },
  {
    id: "2",
    content: "Hello! Yes, I do provide complete home wiring services. What kind of work do you need?",
    sender: "worker",
    timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
    type: "text"
  },
  {
    id: "3",
    content: "I need to install new electrical outlets in my kitchen and living room. Can you help?",
    sender: "customer",
    timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
    type: "text"
  },
  {
    id: "4",
    content: "Absolutely! I can help with that. When would be a good time for me to visit and assess the work?",
    sender: "worker",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    type: "text"
  }
];

export const ChatModal = ({ isOpen, onClose, workerId, workerName }: ChatModalProps) => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() && !selectedImage) return;

    const messageContent = newMessage.trim() || "Image";
    const messageType = selectedImage ? "image" : "text";
    
    const message: Message = {
      id: Date.now().toString(),
      content: messageContent,
      sender: "customer",
      timestamp: new Date(),
      type: messageType,
      imageUrl: selectedImage ? URL.createObjectURL(selectedImage) : undefined
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
    setSelectedImage(null);

    // Simulate worker typing response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const workerResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thanks for your message! I'll get back to you shortly.",
        sender: "worker",
        timestamp: new Date(),
        type: "text"
      };
      setMessages(prev => [...prev, workerResponse]);
    }, 2000);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  const handleClose = () => {
    setNewMessage("");
    setSelectedImage(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg h-[600px] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/placeholder.svg" alt={workerName} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {workerName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-foreground">{workerName}</div>
              <div className="text-sm text-muted-foreground">
                {isTyping ? "Typing..." : "Online"}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "customer"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {message.type === "image" && message.imageUrl && (
                    <div className="mb-2">
                      <img
                        src={message.imageUrl}
                        alt="Shared image"
                        className="rounded-lg max-w-full h-auto"
                      />
                    </div>
                  )}
                  <div className="text-sm">{message.content}</div>
                  <div
                    className={`text-xs mt-1 ${
                      message.sender === "customer"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Image Preview */}
        {selectedImage && (
          <div className="p-4 border-t border-border">
            <div className="relative inline-block">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                className="h-20 w-20 object-cover rounded-lg"
              />
              <button
                onClick={removeSelectedImage}
                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}

        {/* Message Input */}
        <div className="p-4 border-t border-border">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <div className="flex gap-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
                id="image-upload"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <Image className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
            </div>
            
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            
            <Button type="submit" size="icon" disabled={!newMessage.trim() && !selectedImage}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
          
          <div className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send • Click 📎 to attach files
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
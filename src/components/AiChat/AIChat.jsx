import React, { useState } from "react";
import { MessageCircle, X, Bot } from "lucide-react";
import AIChatModal from "./AiChatWidget";

export default function ChatIcon({ user }) {
    const [open, setOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            {/* Floating Chat Button */}
            <div className="fixed bottom-6 right-6 z-50">
                {/* Notification Badge */}
                <div className="absolute -top-1 -right-1">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping"></div>
                    <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full absolute top-0 right-0"></div>
                </div>

                <button
                    onClick={() => setOpen(true)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="group relative bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-4 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-3"
                >
                    {/* Animated background effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Main icon */}
                    <div className="relative z-10">
                        {isHovered ? (
                            <Bot className="w-6 h-6 transform transition-transform duration-300" />
                        ) : (
                            <MessageCircle className="w-6 h-6 transform transition-transform duration-300" />
                        )}
                    </div>

                  
                </button>

                {/* Pulse animation */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-30 animate-ping -z-10"></div>
            </div>

            {/* Chat Modal */}
            {open && (
                <AIChatModal
                    user={user}
                    onClose={() => setOpen(false)}
                    isOpen={open}
                    embedded={false}
                />
            )}
        </>
    );
}
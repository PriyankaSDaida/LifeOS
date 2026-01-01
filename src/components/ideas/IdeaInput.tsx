"use client";

import React, { useState } from 'react';
import { useLifeOSStore } from '@/store/useLifeOSStore';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Zap } from 'lucide-react';

const COLORS = [
    'bg-[#ff7eb6]', // Neon Pink
    'bg-[#7afcff]', // Neon Cyan
    'bg-[#feff9c]', // Neon Yellow
    'bg-[#fff740]', // Bright Yellow
    'bg-[#ff65a3]', // Deep Pink
    'bg-[#7afcff]', // Cyan
    'bg-[#feff9c]', // Light Yellow
];

export function IdeaInput() {
    const [content, setContent] = useState('');
    const addIdea = useLifeOSStore((state) => state.addIdea);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        // Pick random color and rotation
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const rotation = Math.floor(Math.random() * 10) - 5; // -5 to 5 deg

        addIdea(content, color, rotation);
        setContent('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    }

    return (
        <div className="w-full max-w-lg mx-auto mb-8 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-cyan-500 to-yellow-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <form onSubmit={handleSubmit} className="relative bg-black p-4 rounded-lg flex items-end gap-2 border-2 border-white/10">
                <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Dump your brain here..."
                    className="bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-gray-500 resize-none min-h-[40px] max-h-[120px] py-3"
                />
                <Button
                    type="submit"
                    size="icon"
                    disabled={!content.trim()}
                    className="rounded-full bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 text-white border-0"
                >
                    <Send className="w-4 h-4" />
                </Button>
            </form>
        </div>
    );
}

"use client";

import React from 'react';
import { useLifeOSStore } from '@/store/useLifeOSStore';
import { IdeaInput } from '@/components/ideas/IdeaInput';
import { IdeaCard } from '@/components/ideas/IdeaCard';
import { AnimatePresence } from 'framer-motion';

export default function IdeasPage() {
    const ideas = useLifeOSStore((state) => state.ideas);

    return (
        <div className="container mx-auto p-6 min-h-screen">
            <div className="text-center space-y-4 mb-10">
                <h1 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-in fade-in zoom-in duration-500">
                    BRAIN DUMP
                </h1>
                <p className="text-muted-foreground font-mono text-sm tracking-widest uppercase">
                    No filters. Just thoughts.
                </p>
            </div>

            <IdeaInput />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                <AnimatePresence mode="popLayout">
                    {ideas.map((idea) => (
                        <div key={idea.id} className="group">
                            <IdeaCard idea={idea} />
                        </div>
                    ))}
                </AnimatePresence>
            </div>

            {ideas.length === 0 && (
                <div className="text-center text-muted-foreground mt-20 opacity-50">
                    <p>Empty brain? That's rare.</p>
                </div>
            )}
        </div>
    );
}

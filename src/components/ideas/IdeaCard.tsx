"use client";

import React from 'react';
import { useLifeOSStore, Idea } from '@/store/useLifeOSStore';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface IdeaCardProps {
    idea: Idea;
}

export function IdeaCard({ idea }: IdeaCardProps) {
    const deleteIdea = useLifeOSStore((state) => state.deleteIdea);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            className={cn(
                "relative p-4 rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black min-h-[150px] flex flex-col justify-between font-mono break-words transition-transform cursor-pointer",
                idea.color
            )}
            style={{ rotate: `${idea.rotation}deg` }}
        >
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    deleteIdea(idea.id);
                }}
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 hover:bg-black/10 rounded-full p-1 transition-opacity"
            >
                <X className="w-4 h-4" />
            </button>

            <p className="text-sm md:text-base font-bold leading-tight">
                {idea.content}
            </p>

            <div className="text-[10px] opacity-60 self-end mt-2 uppercase tracking-wider">
                {new Date(idea.createdAt).toLocaleDateString()}
            </div>
        </motion.div>
    );
}

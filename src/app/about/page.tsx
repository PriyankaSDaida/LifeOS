"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Code, Heart, Zap, Globe, Mail, Github, Linkedin, MapPin } from "lucide-react";

export default function AboutPage() {
    const skills = [
        "Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "System Design",
        "Productivity", "Time Management", "Financial Planning"
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Hero Profile Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="border-none bg-background/60 backdrop-blur-xl shadow-xl overflow-hidden">
                    <div className="h-32 bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-90" />
                    <CardContent className="relative px-8 pb-8">
                        <div className="absolute -top-16 left-8">
                            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                        </div>

                        <div className="mt-20 flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold">User Name</h1>
                                <p className="text-muted-foreground font-medium">Full Stack Developer & Productivity Enthusiast</p>
                                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> San Francisco, CA</span>
                                    <span className="flex items-center gap-1"><Globe className="w-4 h-4" /> lifeos.app</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Badge variant="secondary" className="px-3 py-1 cursor-pointer hover:bg-secondary/80">
                                    <Github className="w-4 h-4 mr-1" /> Github
                                </Badge>
                                <Badge variant="secondary" className="px-3 py-1 cursor-pointer hover:bg-secondary/80">
                                    <Linkedin className="w-4 h-4 mr-1" /> LinkedIn
                                </Badge>
                                <Badge variant="secondary" className="px-3 py-1 cursor-pointer hover:bg-secondary/80">
                                    <Mail className="w-4 h-4 mr-1" /> Contact
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column - Info */}
                <div className="col-span-1 space-y-6">
                    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
                        <motion.div variants={item}>
                            <Card className="border-none bg-background/60 backdrop-blur-xl hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-yellow-500" />
                                        Interests
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-wrap gap-2">
                                    {["Coding", "Design", "Hiking", "Reading", "AI"].map((tag) => (
                                        <Badge key={tag} variant="outline" className="bg-background/50">{tag}</Badge>
                                    ))}
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={item}>
                            <Card className="border-none bg-background/60 backdrop-blur-xl hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Heart className="w-5 h-5 text-red-500" />
                                        Values
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm text-muted-foreground">
                                    <p>• Continuous Improvement</p>
                                    <p>• Clean Code</p>
                                    <p>• User-Centric Design</p>
                                    <p>• Minimalist Living</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Right Column - Bio & Skills */}
                <div className="col-span-1 md:col-span-2 space-y-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <Card className="border-none bg-background/60 backdrop-blur-xl">
                            <CardHeader>
                                <CardTitle>About Me</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 leading-relaxed text-muted-foreground">
                                <p>
                                    Hello! I'm the creator of LifeOS. My goal is to simplify personal management through intuitive software.
                                    I believe that organizing your life shouldn't feel like a chore, but rather a seamless experience that empowers you to focus on what truly matters.
                                </p>
                                <p>
                                    With a background in software engineering and a passion for design, I built this platform to combine functionality with aesthetics.
                                    When I'm not coding, you can find me exploring new coffee shops, reading sci-fi novels, or hiking in the mountains.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <Card className="border-none bg-background/60 backdrop-blur-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Code className="w-5 h-5 text-blue-500" />
                                    Tech Stack & Skills
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {skills.map((skill, index) => (
                                        <motion.div
                                            key={skill}
                                            whileHover={{ scale: 1.05 }}
                                            className="p-2 rounded-lg bg-secondary/50 text-center text-sm font-medium border border-border/50"
                                        >
                                            {skill}
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

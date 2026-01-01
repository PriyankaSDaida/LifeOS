"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Code, Heart, Zap, Globe, Mail, Github, Linkedin, MapPin, Twitter } from "lucide-react";
import { useLifeOSStore } from "@/store/useLifeOSStore";
import { ProfileEditDialog } from "@/components/profile/ProfileEditDialog";

export default function AboutPage() {
    const { userProfile } = useLifeOSStore();

    // Fallback if store hydration is slightly delayed, though initial state exists
    const profile = userProfile || {
        name: "User Name",
        role: "Role",
        location: "Location",
        image: "",
        skills: [],
        interests: [],
        socials: { github: "Github", linkedin: "LinkedIn" }
    };

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
                <Card className="border-none bg-background/60 backdrop-blur-xl shadow-xl overflow-hidden group">
                    <div className="h-32 bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-90 transition-opacity group-hover:opacity-100" />
                    <CardContent className="relative px-8 pb-8">
                        <div className="absolute -top-16 left-8">
                            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                                <AvatarImage src={profile.image} alt={profile.name} className="object-cover" />
                                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </div>

                        <div className="absolute top-4 right-4">
                            <ProfileEditDialog />
                        </div>

                        <div className="mt-20 flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold">{profile.name}</h1>
                                <p className="text-muted-foreground font-medium">{profile.role}</p>
                                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {profile.location}</span>
                                    <span className="flex items-center gap-1"><Globe className="w-4 h-4" /> {profile.website}</span>
                                </div>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {profile.socials.github && (
                                    <a href={profile.socials.github} target="_blank" rel="noopener noreferrer">
                                        <Badge variant="secondary" className="px-3 py-1 cursor-pointer hover:bg-secondary/80 transition-colors">
                                            <Github className="w-4 h-4 mr-1" /> Github
                                        </Badge>
                                    </a>
                                )}
                                {profile.socials.linkedin && (
                                    <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">
                                        <Badge variant="secondary" className="px-3 py-1 cursor-pointer hover:bg-secondary/80 transition-colors">
                                            <Linkedin className="w-4 h-4 mr-1" /> LinkedIn
                                        </Badge>
                                    </a>
                                )}
                                {profile.socials.twitter && (
                                    <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer">
                                        <Badge variant="secondary" className="px-3 py-1 cursor-pointer hover:bg-secondary/80 transition-colors">
                                            <Twitter className="w-4 h-4 mr-1" /> Twitter
                                        </Badge>
                                    </a>
                                )}
                                {profile.socials.email && (
                                    <a href={`mailto:${profile.socials.email}`}>
                                        <Badge variant="secondary" className="px-3 py-1 cursor-pointer hover:bg-secondary/80 transition-colors">
                                            <Mail className="w-4 h-4 mr-1" /> Contact
                                        </Badge>
                                    </a>
                                )}
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
                                    {profile.interests.map((tag) => (
                                        <Badge key={tag} variant="outline" className="bg-background/50 hover:bg-background/80 transition-colors">{tag}</Badge>
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
                                <p>{profile.bio}</p>
                                {profile.longBio && <p>{profile.longBio}</p>}
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
                                    {profile.skills.map((skill) => (
                                        <motion.div
                                            key={skill}
                                            whileHover={{ scale: 1.05 }}
                                            className="p-2 rounded-lg bg-secondary/50 text-center text-sm font-medium border border-border/50 hover:border-primary/50 transition-colors"
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


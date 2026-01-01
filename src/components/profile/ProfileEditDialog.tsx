"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLifeOSStore, UserProfile } from "@/store/useLifeOSStore";
import { Edit, Save } from "lucide-react";

export function ProfileEditDialog() {
    const { userProfile, updateUserProfile } = useLifeOSStore();
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<UserProfile>(userProfile);

    const handleChange = (field: keyof UserProfile, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSocialChange = (key: keyof UserProfile['socials'], value: string) => {
        setFormData((prev) => ({
            ...prev,
            socials: { ...prev.socials, [key]: value }
        }));
    };

    const handleArrayChange = (field: 'skills' | 'interests', value: string) => {
        // Split by comma and trim
        const array = value.split(',').map(item => item.trim()).filter(Boolean);
        setFormData((prev) => ({ ...prev, [field]: array }));
    };

    const handleSave = () => {
        updateUserProfile(formData);
        setOpen(false);
    };

    // Reset form on open
    const handleOpenChange = (open: boolean) => {
        if (open) setFormData(userProfile);
        setOpen(open);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <Edit className="h-4 w-4" /> Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Name</Label>
                            <Input value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>Role</Label>
                            <Input value={formData.role} onChange={(e) => handleChange('role', e.target.value)} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Location</Label>
                        <Input value={formData.location} onChange={(e) => handleChange('location', e.target.value)} />
                    </div>

                    <div className="space-y-4 rounded-lg border p-4">
                        <div className="space-y-2">
                            <Label>Profile Image</Label>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        className="cursor-pointer"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    const base64String = reader.result as string;
                                                    handleChange('image', base64String);
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-background px-2 text-muted-foreground">Or using URL</span>
                                    </div>
                                </div>
                                <Input
                                    placeholder="https://..."
                                    value={formData.image}
                                    onChange={(e) => handleChange('image', e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground">Upload a file (saved locally) or provide an external URL.</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Website Display</Label>
                        <Input value={formData.website} onChange={(e) => handleChange('website', e.target.value)} />
                    </div>

                    {/* Bios */}
                    <div className="space-y-2">
                        <Label>Short Bio (Hero)</Label>
                        <Textarea
                            value={formData.bio}
                            onChange={(e) => handleChange('bio', e.target.value)}
                            className="h-20"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Long Bio (About Section)</Label>
                        <Textarea
                            value={formData.longBio || ""}
                            onChange={(e) => handleChange('longBio', e.target.value)}
                            className="h-32"
                        />
                    </div>

                    {/* Socials */}
                    <div className="space-y-2">
                        <Label className="text-base font-semibold">Social Links</Label>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label className="text-xs">GitHub Label</Label>
                                <Input value={formData.socials.github} onChange={(e) => handleSocialChange('github', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs">LinkedIn Label</Label>
                                <Input value={formData.socials.linkedin} onChange={(e) => handleSocialChange('linkedin', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs">Twitter Label</Label>
                                <Input value={formData.socials.twitter} onChange={(e) => handleSocialChange('twitter', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs">Email Label</Label>
                                <Input value={formData.socials.email} onChange={(e) => handleSocialChange('email', e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* Arrays */}
                    <div className="space-y-2">
                        <Label>Skills (comma separated)</Label>
                        <Input
                            value={formData.skills.join(', ')}
                            onChange={(e) => handleArrayChange('skills', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Interests (comma separated)</Label>
                        <Input
                            value={formData.interests.join(', ')}
                            onChange={(e) => handleArrayChange('interests', e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Save, X } from "lucide-react";
import type { VtuberProfile, Theme } from "@prisma/client";

interface ProfileFormProps {
	profile?: VtuberProfile;
	themes: Theme[];
	onSubmit: (data: VtuberProfile) => Promise<void>;
	onCancel: () => void;
}

export default function ProfileForm({
	profile,
	themes,
	onSubmit,
	onCancel,
}: ProfileFormProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [profileForm, setProfileForm] = useState<VtuberProfile>(
		profile ?? {
			id: 0,
			createdOn: new Date(),
			updatedOn: new Date(),
			name: "",
			mid: "",
			roomId: "",
			metaTitle: "",
			metaDescription: "",
			defaultThemeId: null,
		} as VtuberProfile,
	);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		await onSubmit(profileForm);
		setIsLoading(false);
	};

	return (
		<Card className="border-2 border-dashed">
			<CardContent className="p-4">
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<Label htmlFor="name">VTuber 名称</Label>
							<Input
								id="name"
								value={profileForm.name}
								onChange={(e) =>
									setProfileForm({ ...profileForm, name: e.target.value })
								}
								placeholder="输入 VTuber 名称"
								required
							/>
						</div>
						<div>
							<Label htmlFor="defaultThemeId">默认主题</Label>
							<Select
								value={profileForm.defaultThemeId?.toString() || "none"}
								onValueChange={(value) =>
									setProfileForm({
										...profileForm,
										defaultThemeId:
											value === "none" ? null : Number.parseInt(value),
									})
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="选择默认主题" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="none">无默认主题</SelectItem>
									{themes.map((theme) => (
										<SelectItem key={theme.id} value={theme.id.toString()}>
											{theme.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<Label htmlFor="mid">Bilibili 用户 ID (mid)</Label>
							<Input
								id="mid"
								value={profileForm.mid ?? ""}
								onChange={(e) =>
									setProfileForm({ ...profileForm, mid: e.target.value})
								}
								placeholder="例如: 12345678"
							/>
						</div>
						<div>
							<Label htmlFor="roomId">Bilibili 直播间 ID</Label>
							<Input
								id="roomId"
								value={profileForm.roomId ?? ""}
								onChange={(e) =>
									setProfileForm({ ...profileForm, roomId: e.target.value})
								}
								placeholder="例如: 123456"
							/>
						</div>
					</div>
					<div>
						<Label htmlFor="metaTitle">页面标题</Label>
						<Input
							id="metaTitle"
							value={profileForm.metaTitle ?? ""}
							onChange={(e) =>
								setProfileForm({ ...profileForm, metaTitle: e.target.value })
							}
							placeholder="页面标题 (用于 SEO)"
						/>
					</div>
					<div>
						<Label htmlFor="metaDescription">页面描述</Label>
						<Textarea
							id="metaDescription"
							value={profileForm.metaDescription ?? ""}
							onChange={(e) =>
								setProfileForm({
									...profileForm,
									metaDescription: e.target.value,
								})
							}
							placeholder="页面描述 (用于 SEO)"
							rows={3}
						/>
					</div>
					<div className="flex gap-2">
						<Button type="submit" disabled={isLoading || !profileForm.name}>
							<Save className="w-4 h-4 mr-2" />
							{isLoading ? "保存中..." : "保存"}
						</Button>
						<Button type="button" onClick={onCancel} variant="outline">
							<X className="w-4 h-4 mr-2" />
							取消
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}

"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, X } from "lucide-react";
import type { ThemeForEditOrCreate } from "./ThemesPanel";

interface ThemeFormProps {
	theme: ThemeForEditOrCreate;
	onSubmit: (data: ThemeForEditOrCreate) => Promise<void>;
	onCancel: () => void;
}

export default function ThemeForm({
	theme,
	onSubmit,
	onCancel,
}: ThemeFormProps) {
	const [loading, setLoading] = useState(false);

	const [themeEditOrCreate, setFormData] =
		useState<ThemeForEditOrCreate>(theme);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		await onSubmit(themeEditOrCreate);
		setLoading(false);
	};

	return (
		<Card className="border-2 border-dashed">
			<CardContent className="p-4">
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<Label htmlFor="name">主题名称</Label>
							<Input
								id="name"
								value={themeEditOrCreate.theme.name}
								onChange={(e) =>
									setFormData({
										...themeEditOrCreate,
										theme: { ...themeEditOrCreate.theme, name: e.target.value },
									})
								}
								placeholder="例如：默认主题"
								required
							/>
						</div>
						<div>
							<Label htmlFor="avatarImagePath">头像图片路径</Label>
							<Input
								id="avatarImagePath"
								value={themeEditOrCreate.theme.avatarImagePath}
								onChange={(e) =>
									setFormData({
										...themeEditOrCreate,
										theme: {
											...themeEditOrCreate.theme,
											avatarImagePath: e.target.value,
										},
									})
								}
								placeholder="/img/avatar.png"
								required
							/>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<Label htmlFor="backgroundImagePath">背景图片路径</Label>
							<Input
								id="backgroundImagePath"
								value={themeEditOrCreate.theme.backgroundImagePath ?? ""}
								onChange={(e) =>
									setFormData({
										...themeEditOrCreate,
										theme: {
											...themeEditOrCreate.theme,
											backgroundImagePath: e.target.value,
										},
									})
								}
								placeholder="/img/background.png"
							/>
						</div>
						<div className="flex items-center space-x-2">
							<input
								id="isActive"
								type="checkbox"
								checked={themeEditOrCreate.theme.isActive}
								onChange={(e) =>
									setFormData({
										...themeEditOrCreate,
										theme: {
											...themeEditOrCreate.theme,
											isActive: e.target.checked,
										},
									})
								}
								className="rounded"
							/>
							<Label htmlFor="isActive">启用主题</Label>
						</div>
					</div>
					<div>
						<Label htmlFor="description">描述</Label>
						<Textarea
							id="description"
							value={themeEditOrCreate.theme.description ?? ""}
							onChange={(e) =>
								setFormData({
									...themeEditOrCreate,
									theme: {
										...themeEditOrCreate.theme,
										description: e.target.value,
									},
								})
							}
							placeholder="主题描述..."
							rows={3}
						/>
					</div>
					<div className="flex gap-2">
						<Button type="submit" disabled={loading}>
							<Save className="w-4 h-4 mr-2" />
							{loading ? "保存中..." : "保存"}
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

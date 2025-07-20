"use client";

import { useAtom, useSetAtom } from "jotai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import React, { useState } from "react";
import {
	themesAtom,
	selectedProfileAtom,
	selectedProfileIdAtom,
	useCreateThemeMutation,
	useDeleteThemeMutation,
	useUpdateThemeMutation,
	vtuberProfilesAtom,
} from "@/lib/admin-store";
import ThemeForm from "./ThemeForm";
import type { Theme } from "@prisma/client";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export type ThemeForEditOrCreate = {
	theme: Theme;
	create: boolean;
};

export default function ThemesPanel() {
	const [{ data: profiles, refetch: refetchProfiles }] = useAtom(vtuberProfilesAtom);
	const [selectedProfileId, setSelectedProfileId] = useAtom(selectedProfileIdAtom);
	const [selectedProfile, setSelectedProfile] = useAtom(selectedProfileAtom);
	// Jotai atoms
	const [themes] = useAtom(themesAtom);

	// Mutations
	const { mutateAsync: createTheme } = useCreateThemeMutation();
	const { mutateAsync: updateTheme } = useUpdateThemeMutation();
	const { mutateAsync: deleteTheme } = useDeleteThemeMutation();

	const [selectedTheme, setSelectedTheme] =
		useState<ThemeForEditOrCreate | null>(null);

	const handleCreate = () => {
		if (!selectedProfile) {
			toast.error("请先选择一个个人资料");
			return;
		}
		setSelectedTheme({
			theme: {
				id: 0,
				name: "",
				description: "",
				avatarImagePath: "",
				backgroundImagePath: "",
				faviconImagePath: "",
				isActive: true,
				vtuberProfileId: selectedProfile.id,
				createdOn: new Date(),
				updatedOn: new Date(),
			},
			create: true,
		});
	};

	const handleEdit = (theme: Theme) => {
		setSelectedTheme({
			theme,
			create: false,
		});
	};

	const handleSave = async (theme: ThemeForEditOrCreate) => {
		if (theme.create) {
			try {
				await createTheme(theme.theme);
				toast.success("主题创建成功");
				refetchProfiles();
			} catch (error) {
				toast.error("创建主题失败");
			}
		} else {
			try {
				await updateTheme(theme.theme);
				toast.success("主题更新成功");
				refetchProfiles();
			} catch (error) {
				toast.error("更新主题失败");
			}
		}
		setSelectedTheme(null);
	};

	const handleDelete = async (id: number) => {
		if (!confirm("确定要删除这个主题吗？")) return;

		try {
			await deleteTheme(id);
			toast.success("主题删除成功");
			refetchProfiles();
		} catch (error) {
			toast.error("删除主题失败");
		}
	};

	const handleCancel = () => {
		setSelectedTheme(null);
	};

	const handleProfileChange = (profileId: string) => {
		setSelectedProfileId(Number(profileId));
	};

	return (
		<div className="space-y-6">
			{/* Profile Selector */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>选择个人资料</CardTitle>
						{selectedProfile && (
							<Button onClick={handleCreate} size="sm">
								<Plus className="w-4 h-4 mr-2" />
								添加主题
							</Button>
						)}
					</div>
				</CardHeader>
				<CardContent>
					{profiles && profiles.length > 0 ? (
						<div className="space-y-4">
							<Select
								value={selectedProfileId?.toString() || profiles[0]?.id.toString()}
								onValueChange={handleProfileChange}
							>
								<SelectTrigger>
									<SelectValue placeholder="选择个人资料" />
								</SelectTrigger>
								<SelectContent>
									{profiles.map((profile) => (
										<SelectItem key={profile.id} value={profile.id.toString()}>
											{profile.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					) : (
						<div className="text-center py-8 text-gray-500">
							<p>未找到个人资料。请先创建个人资料。</p>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Create Form - Show at top when creating */}
			{selectedTheme?.create && (
				<Card className="border-2 border-blue-200">
					<CardHeader>
						<CardTitle>创建新主题</CardTitle>
					</CardHeader>
					<CardContent>
						<ThemeForm
							theme={selectedTheme}
							onSubmit={handleSave}
							onCancel={handleCancel}
						/>
					</CardContent>
				</Card>
			)}

			{/* Themes List for Selected Profile */}
			{selectedProfile && (
				<Card>
					<CardHeader>
						<CardTitle>{selectedProfile.name} - 主题管理</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{/* Themes List */}
						<div className="space-y-3">
							{themes.map((theme) => (
								<Card
									key={theme.id}
									className={
										selectedTheme?.theme.id === theme.id
											? "border-2 border-blue-200"
											: ""
									}
								>
									<CardContent className="p-4">
										{selectedTheme?.theme.id === theme.id ? (
											<ThemeForm
												theme={selectedTheme}
												onSubmit={handleSave}
												onCancel={handleCancel}
											/>
										) : (
											<div className="flex items-center justify-between">
												<div className="flex-1">
													<div className="flex items-center gap-2 mb-2">
														<h3 className="font-medium">{theme.name}</h3>
														{theme.isActive && (
															<span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
																启用
															</span>
														)}
													</div>
													{theme.description && (
														<p className="text-sm text-gray-600 mb-2">
															{theme.description}
														</p>
													)}
													<div className="flex items-center gap-4 text-sm text-gray-500">
														<span>头像: {theme.avatarImagePath}</span>
														{theme.backgroundImagePath && (
															<span>背景: {theme.backgroundImagePath}</span>
														)}
														{theme.faviconImagePath && (
															<span>Favicon: {theme.faviconImagePath}</span>
														)}
													</div>
												</div>
												<div className="flex gap-2">
													<Button
														onClick={() => handleEdit(theme)}
														variant="outline"
														size="sm"
													>
														<Edit className="w-4 h-4" />
													</Button>
													<Button
														onClick={() => handleDelete(theme.id)}
														variant="outline"
														size="sm"
													>
														<Trash2 className="w-4 h-4" />
													</Button>
												</div>
											</div>
										)}
									</CardContent>
								</Card>
							))}
							{themes.length === 0 && !selectedTheme && (
								<div className="text-center py-8 text-gray-500">
									<p>未找到主题。创建您的第一个主题开始使用。</p>
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}

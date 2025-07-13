"use client";

import { useAtom, useSetAtom } from "jotai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import React, { useState } from "react";
import {
	themesAtom,
	vtuberProfileAtom,
	useCreateThemeMutation,
	useDeleteThemeMutation,
	useUpdateThemeMutation,
} from "@/lib/admin-store";
import ThemeForm from "./ThemeForm";
import type { Theme } from "@/generated/client";

export type ThemeForEditOrCreate = {
	theme: Theme;
	create: boolean;
};

export default function ThemesPanel() {
	const [{ data: vtuberProfile, isLoading, isError, error, refetch }] =
		useAtom(vtuberProfileAtom);
	// Jotai atoms
	const [themes] = useAtom(themesAtom);

	// Mutations
	const { mutateAsync: createTheme } = useCreateThemeMutation();
	const { mutateAsync: updateTheme } = useUpdateThemeMutation();
	const { mutateAsync: deleteTheme } = useDeleteThemeMutation();

	const [selectedTheme, setSelectedTheme] =
		useState<ThemeForEditOrCreate | null>(null);

	const handleCreate = () => {
		setSelectedTheme({
			theme: {
				id: 0,
				name: "",
				description: "",
				avatarImagePath: "",
				backgroundImagePath: "",
				isActive: true,
				vtuberProfileId: vtuberProfile?.id ?? 0,
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
				refetch();
			} catch (error) {
				toast.error("创建主题失败");
			}
		} else {
			try {
				await updateTheme(theme.theme);
				toast.success("主题更新成功");
				refetch();
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
			refetch();
		} catch (error) {
			toast.error("删除主题失败");
		}
	};

	const handleCancel = () => {
		setSelectedTheme(null);
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle>主题管理</CardTitle>
					{!selectedTheme && (
						<Button onClick={handleCreate} size="sm">
							<Plus className="w-4 h-4 mr-2" />
							添加主题
						</Button>
					)}
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				{/* Create Form - Only show when creating, not when editing */}
				{selectedTheme && (
					<ThemeForm
						theme={selectedTheme}
						onSubmit={handleSave}
						onCancel={handleCancel}
					/>
				)}

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
	);
}

"use client";

import { useAtom, useAtomValue } from "jotai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus, Edit, Trash2, User } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
	vtuberProfilesAtom,
	selectedProfileIdAtom,
	selectedProfileAtom,
	useCreateVtuberProfileMutation,
	useUpdateVtuberProfileMutation,
	useDeleteVtuberProfileMutation,
} from "@/lib/admin-store";
import ProfileForm from "./ProfileForm";
import type { VtuberProfile, Theme } from "@prisma/client";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export type ProfileForEditOrCreate = {
	profile: VtuberProfile;
	create: boolean;
};

export default function ProfilePanel() {
	// Jotai atoms
	const [{ data: profiles, isLoading, isError, error, refetch }] = useAtom(vtuberProfilesAtom);
	const [selectedProfileId, setSelectedProfileId] = useAtom(selectedProfileIdAtom);
	const [selectedProfile, setSelectedProfile] = useAtom(selectedProfileAtom);

	const { mutateAsync: createProfile } = useCreateVtuberProfileMutation();
	const { mutateAsync: updateProfile } = useUpdateVtuberProfileMutation();
	const { mutateAsync: deleteProfile } = useDeleteVtuberProfileMutation();

	const [selectedProfileForEdit, setSelectedProfileForEdit] = useState<ProfileForEditOrCreate | null>(null);

	const handleCreate = () => {
		setSelectedProfileForEdit({
			profile: {
				id: 0,
				name: "",
				mid: "",
				roomId: "",
				metaTitle: "",
				metaDescription: "",
				defaultThemeId: null,
				createdOn: new Date(),
				updatedOn: new Date(),
			},
			create: true,
		});
	};

	const handleEdit = (profile: VtuberProfile) => {
		setSelectedProfileForEdit({
			profile,
			create: false,
		});
	};

	const handleSave = async (profileData: ProfileForEditOrCreate) => {
		if (profileData.create) {
			try {
				await createProfile(profileData.profile);
				toast.success("个人资料创建成功");
				refetch();
				// After refetch, the new profile should be the last one in the list
				// We'll set it as selected in the next render cycle
			} catch (error) {
				toast.error(`保存个人资料失败: ${error}`);
			}
		} else {
			try {
				await updateProfile(profileData.profile);
				toast.success("个人资料更新成功");
				refetch();
			} catch (error) {
				toast.error(`保存个人资料失败: ${error}`);
			}
		}
		setSelectedProfileForEdit(null);
	};

	const handleDelete = async (id: number) => {
		if (!confirm("确定要删除这个个人资料吗？这将删除所有相关的主题、链接和歌曲数据。")) return;

		try {
			await deleteProfile(id);
			toast.success("个人资料删除成功");
			refetch();
		} catch (error) {
			toast.error(`删除个人资料失败: ${error}`);
		}
	};

	const handleCancel = () => {
		setSelectedProfileForEdit(null);
	};

	const handleProfileChange = (profileId: string) => {
		setSelectedProfileId(Number(profileId));
	};

	if (isLoading) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>个人资料管理</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-center h-64 text-gray-500">
						正在加载个人资料...
					</div>
				</CardContent>
			</Card>
		);
	}

	if (isError) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>个人资料管理</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-center h-64 text-gray-500">
						加载个人资料失败: {error?.message}
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="space-y-6">
			{/* Profile Selector */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>选择个人资料</CardTitle>
						<Button onClick={handleCreate} size="sm">
							<Plus className="w-4 h-4 mr-2" />
							添加个人资料
						</Button>
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
							<p>未找到个人资料。创建您的第一个个人资料开始使用。</p>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Create Form - Show at top when creating */}
			{selectedProfileForEdit?.create && (
				<Card className="border-2 border-blue-200">
					<CardHeader>
						<CardTitle>创建新个人资料</CardTitle>
					</CardHeader>
					<CardContent>
						<ProfileForm
							profile={selectedProfileForEdit.profile}
							themes={[]}
							onSubmit={handleSave}
							onCancel={handleCancel}
							create={true}
						/>
					</CardContent>
				</Card>
			)}

			{/* Selected Profile Details */}
			{selectedProfile && !selectedProfileForEdit && (
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle>个人资料详情</CardTitle>
							<div className="flex gap-2">
								<Button onClick={() => handleEdit(selectedProfile)} size="sm">
									<Edit className="w-4 h-4 mr-2" />
									编辑
								</Button>
								<Button 
									onClick={() => handleDelete(selectedProfile.id)} 
									variant="outline" 
									size="sm"
								>
									<Trash2 className="w-4 h-4 mr-2" />
									删除
								</Button>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div>
								<label className="text-sm font-medium text-gray-700">
									VTuber 名称
								</label>
								<p className="text-lg">{selectedProfile.name}</p>
							</div>
							{selectedProfile.mid && (
								<div>
									<label className="text-sm font-medium text-gray-700">
										Bilibili 用户 ID
									</label>
									<p className="text-gray-600">{selectedProfile.mid}</p>
								</div>
							)}
							{selectedProfile.roomId && (
								<div>
									<label className="text-sm font-medium text-gray-700">
										Bilibili 直播间 ID
									</label>
									<p className="text-gray-600">{selectedProfile.roomId}</p>
								</div>
							)}
							{selectedProfile.metaTitle && (
								<div>
									<label className="text-sm font-medium text-gray-700">
										页面标题
									</label>
									<p className="text-gray-600">{selectedProfile.metaTitle}</p>
								</div>
							)}
							{selectedProfile.metaDescription && (
								<div>
									<label className="text-sm font-medium text-gray-700">
										页面描述
									</label>
									<p className="text-gray-600">{selectedProfile.metaDescription}</p>
								</div>
							)}
							{selectedProfile.defaultThemeId && selectedProfile.themes && (
								<div>
									<label className="text-sm font-medium text-gray-700">
										默认主题
									</label>
									<p className="text-gray-600">
										{selectedProfile.themes.find((t) => t.id === selectedProfile.defaultThemeId)
											?.name || "未知主题"}
									</p>
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			)}

			{/* Edit Form */}
			{selectedProfileForEdit && !selectedProfileForEdit.create && (
				<Card className="border-2 border-blue-200">
					<CardHeader>
						<CardTitle>编辑个人资料</CardTitle>
					</CardHeader>
					<CardContent>
						<ProfileForm
							profile={selectedProfileForEdit.profile}
							themes={selectedProfile?.themes || []}
							onSubmit={handleSave}
							onCancel={handleCancel}
							create={false}
						/>
					</CardContent>
				</Card>
			)}
		</div>
	);
}

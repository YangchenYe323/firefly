"use client";

import { useAtom } from "jotai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Edit } from "lucide-react";
import React, { useState } from "react";
import {
	vtuberProfileAtom,
	useCreateVtuberProfileMutation,
	useUpdateVtuberProfileMutation,
} from "@/lib/admin-store";
import ProfileForm from "./ProfileForm";
import type { VtuberProfile } from "@prisma/client";

export default function ProfilePanel() {
	// Jotai atoms
	const [
		{
			data: profile,
			isLoading: isLoadingProfile,
			isError: isErrorProfile,
			error: errorProfile,
			refetch: refetchProfile,
		},
	] = useAtom(vtuberProfileAtom);

	const { mutateAsync: createProfile } = useCreateVtuberProfileMutation();
	const { mutateAsync: updateProfile } = useUpdateVtuberProfileMutation();

	const [isEditing, setIsEditing] = useState<boolean>(false);

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSave = async (formData: VtuberProfile) => {
		if (profile?.id) {
			try {
				await updateProfile(formData);
				toast.success("个人资料更新成功");

				refetchProfile();
			} catch (error) {
				toast.error(`保存个人资料失败: ${error}`);
			}
		} else {
			try {
				await createProfile(formData);
				toast.success("个人资料创建成功");

				refetchProfile();
			} catch (error) {
				toast.error(`保存个人资料失败: ${error}`);
			}
		}

		setIsEditing(false);
	};

	const handleCancel = () => {
		setIsEditing(false);
	};

	if (!profile && !isEditing && !isLoadingProfile) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>个人资料</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-center py-8">
						<p className="text-gray-500 mb-4">尚未创建个人资料</p>
						<Button onClick={handleEdit}>
							<Edit className="w-4 h-4 mr-2" />
							创建个人资料
						</Button>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle>个人资料</CardTitle>
					{!isEditing && (
						<Button onClick={handleEdit} size="sm">
							<Edit className="w-4 h-4 mr-2" />
							编辑
						</Button>
					)}
				</div>
			</CardHeader>
			<CardContent>
				{isLoadingProfile ? (
					<div className="flex items-center justify-center h-64 text-gray-500">
						正在加载个人资料...
					</div>
				) : isErrorProfile ? (
					<div className="flex items-center justify-center h-64 text-gray-500">
						加载个人资料失败: {errorProfile?.message}
					</div>
				) : isEditing ? (
					<ProfileForm
						profile={profile}
						themes={profile?.themes ?? []}
						onSubmit={handleSave}
						onCancel={handleCancel}
					/>
				) : (
					<div className="space-y-4">
						<div>
							<label className="text-sm font-medium text-gray-700">
								VTuber 名称
							</label>
							<p className="text-lg">{profile?.name}</p>
						</div>
						{profile?.mid && (
							<div>
								<label className="text-sm font-medium text-gray-700">
									Bilibili 用户 ID
								</label>
								<p className="text-gray-600">{profile.mid}</p>
							</div>
						)}
						{profile?.roomId && (
							<div>
								<label className="text-sm font-medium text-gray-700">
									Bilibili 直播间 ID
								</label>
								<p className="text-gray-600">{profile.roomId}</p>
							</div>
						)}
						{profile?.metaTitle && (
							<div>
								<label className="text-sm font-medium text-gray-700">
									页面标题
								</label>
								<p className="text-gray-600">{profile.metaTitle}</p>
							</div>
						)}
						{profile?.metaDescription && (
							<div>
								<label className="text-sm font-medium text-gray-700">
									页面描述
								</label>
								<p className="text-gray-600">{profile.metaDescription}</p>
							</div>
						)}
						{profile?.defaultThemeId && (
							<div>
								<label className="text-sm font-medium text-gray-700">
									默认主题
								</label>
								<p className="text-gray-600">
									{profile.themes.find((t) => t.id === profile.defaultThemeId)
										?.name || "未知主题"}
								</p>
							</div>
						)}
					</div>
				)}
			</CardContent>
		</Card>
	);
}

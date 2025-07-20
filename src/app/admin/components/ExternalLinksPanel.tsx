"use client";

import { useAtom, useAtomValue } from "jotai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
	externalLinksAtom,
	vtuberProfilesAtom,
	selectedProfileIdAtom,
	selectedProfileAtom,
	useCreateExternalLinkMutation,
	useUpdateExternalLinkMutation,
	useDeleteExternalLinkMutation,
} from "@/lib/admin-store";
import ExternalLinkForm from "./ExternalLinkForm";
import type { VtuberExternalLink } from "@prisma/client";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export type ExternalLinkForEditOrCreate = {
	link: VtuberExternalLink;
	create: boolean;
};

export default function ExternalLinksPanel() {
	// Jotai atoms
	const [{ data: profiles, isLoading, isError, error, refetch }] = useAtom(vtuberProfilesAtom);
	const [selectedProfileId, setSelectedProfileId] = useAtom(selectedProfileIdAtom);
	const selectedProfile = useAtomValue(selectedProfileAtom);
	const links = useAtomValue(externalLinksAtom);

	const [selectedLink, setSelectedLink] =
		useState<ExternalLinkForEditOrCreate | null>(null);

	// Mutations
	const { mutateAsync: createLink } = useCreateExternalLinkMutation();
	const { mutateAsync: updateLink } = useUpdateExternalLinkMutation();
	const { mutateAsync: deleteLink } = useDeleteExternalLinkMutation();

	const handleCreate = () => {
		if (!selectedProfile) {
			toast.error("请先选择一个个人资料");
			return;
		}
		setSelectedLink({
			link: {
				id: 0,
				value: "",
				icon: "",
				href: "",
				displayOrder: 0,
				vtuberProfileId: selectedProfile.id,
				createdOn: new Date(),
				updatedOn: new Date(),
			},
			create: true,
		});
	};

	const handleEdit = (link: VtuberExternalLink) => {
		setSelectedLink({
			link,
			create: false,
		});
	};

	const handleSave = async (link: ExternalLinkForEditOrCreate) => {
		if (link.create) {
			try {
				await createLink(link.link);
				toast.success("链接创建成功");
				refetch();
			} catch (error) {
				toast.error("链接创建失败");
			}
		} else if (link.link.id) {
			try {
				await updateLink(link.link);
				toast.success("链接更新成功");
				refetch();
			} catch (error) {
				toast.error("链接更新失败");
			}
		}
		setSelectedLink(null);
	};

	const handleDelete = async (id: number) => {
		if (!confirm("确定要删除这个链接吗？")) return;

		try {
			await deleteLink(id);
			toast.success("链接删除成功");
			refetch();
		} catch (error) {
			toast.error("删除链接失败");
		}
	};

	const handleCancel = () => {
		setSelectedLink(null);
	};

	const handleProfileChange = (profileId: string) => {
		setSelectedProfileId(Number(profileId));
	};

	if (isLoading) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>外部链接</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-center h-64 text-gray-500">
						正在加载外部链接...
					</div>
				</CardContent>
			</Card>
		);
	}

	if (isError) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>外部链接</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-center h-64 text-gray-500">
						加载外部链接失败: {error?.message}
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
						{selectedProfile && (
							<Button onClick={handleCreate} size="sm">
								<Plus className="w-4 h-4 mr-2" />
								添加链接
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
			{selectedLink?.create && (
				<Card className="border-2 border-blue-200">
					<CardHeader>
						<CardTitle>创建新链接</CardTitle>
					</CardHeader>
					<CardContent>
						<ExternalLinkForm
							link={selectedLink}
							onSubmit={handleSave}
							onCancel={handleCancel}
						/>
					</CardContent>
				</Card>
			)}

			{/* Links List for Selected Profile */}
			{selectedProfile && (
				<Card>
					<CardHeader>
						<CardTitle>{selectedProfile.name} - 外部链接</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{/* Links List */}
						<div className="space-y-3">
							{links.map((link) => (
								<Card
									key={link.id}
									className={
										selectedLink?.link.id === link.id
											? "border-2 border-blue-200"
											: ""
									}
								>
									<CardContent className="p-4">
										{selectedLink?.link.id === link.id ? (
											<ExternalLinkForm
												link={selectedLink}
												onSubmit={handleSave}
												onCancel={handleCancel}
											/>
										) : (
											<div className="flex items-center justify-between">
												<div className="flex-1">
													<div className="flex items-center gap-2 mb-2">
														<h3 className="font-medium">{link.value}</h3>
														<span className="text-sm text-gray-500">
															#{link.displayOrder}
														</span>
													</div>
													<div className="flex items-center gap-2 text-sm text-gray-600">
														{link.icon && (
															<span className="text-xs bg-gray-100 px-2 py-1 rounded">
																{link.icon}
															</span>
														)}
														<a
															href={link.href}
															target="_blank"
															rel="noopener noreferrer"
															className="text-blue-600 hover:underline flex items-center gap-1"
														>
															<ExternalLink className="w-3 h-3" />
															{link.href}
														</a>
													</div>
												</div>
												<div className="flex gap-2">
													<Button
														onClick={() => handleEdit(link)}
														variant="outline"
														size="sm"
													>
														<Edit className="w-4 h-4" />
													</Button>
													<Button
														onClick={() => handleDelete(link.id)}
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
							{links.length === 0 && !selectedLink && (
								<div className="text-center py-8 text-gray-500">
									<p>未找到外部链接。创建您的第一个链接开始使用。</p>
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}

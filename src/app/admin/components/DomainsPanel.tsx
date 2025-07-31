"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Globe } from "lucide-react";
import { toast } from "sonner";
import type { Domain, VtuberProfile } from "@prisma/client";
import {
	useAtom,
	useAtomValue,
} from "jotai";
import {
	selectedProfileAtom,
	useCreateDomainMutation,
	useUpdateDomainMutation,
	useDeleteDomainMutation,
    vtuberProfilesAtom,
} from "@/lib/admin-store";

interface DomainFormData {
	name: string;
	icpLicenseNumber: string;
	publicSecurityFilingNumber: string;
}

export default function DomainsPanel() {
    const [{refetch}] = useAtom(vtuberProfilesAtom);
	const selectedProfile = useAtomValue(selectedProfileAtom);
	const [isEditing, setIsEditing] = useState(false);
	const [editingDomain, setEditingDomain] = useState<Domain | null>(null);
	const [formData, setFormData] = useState<DomainFormData>({
		name: "",
		icpLicenseNumber: "",
		publicSecurityFilingNumber: "",
	});

	const { mutateAsync: createDomain } = useCreateDomainMutation();
	const { mutateAsync: updateDomain } = useUpdateDomainMutation();
	const { mutateAsync: deleteDomain } = useDeleteDomainMutation();

	const handleCreateDomain = () => {
		if (!selectedProfile) {
			toast.error("请先选择一个个人资料");
			return;
		}
		setFormData({
			name: "",
			icpLicenseNumber: "",
			publicSecurityFilingNumber: "",
		});
		setEditingDomain(null);
		setIsEditing(true);
	};

	const handleEditDomain = (domain: Domain) => {
		setFormData({
			name: domain.name,
			icpLicenseNumber: domain.icpLicenseNumber || "",
			publicSecurityFilingNumber: domain.publicSecurityFilingNumber || "",
		});
		setEditingDomain(domain);
		setIsEditing(true);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditingDomain(null);
		setFormData({
			name: "",
			icpLicenseNumber: "",
			publicSecurityFilingNumber: "",
		});
	};

	const handleSave = async () => {
		if (!selectedProfile) {
			toast.error("请先选择一个个人资料");
			return;
		}

		if (!formData.name.trim()) {
			toast.error("域名名称不能为空");
			return;
		}

		try {
			if (editingDomain) {
				await updateDomain({
					...editingDomain,
					name: formData.name.trim(),
					icpLicenseNumber: formData.icpLicenseNumber.trim() || null,
					publicSecurityFilingNumber: formData.publicSecurityFilingNumber.trim() || null,
				});
				toast.success("域名更新成功");
                refetch()
			} else {
				await createDomain({
					id: 0,
					name: formData.name.trim(),
					icpLicenseNumber: formData.icpLicenseNumber.trim() || null,
					publicSecurityFilingNumber: formData.publicSecurityFilingNumber.trim() || null,
					vtuberProfileId: selectedProfile.id,
					createdOn: new Date(),
					updatedOn: new Date(),
				});
				toast.success("域名创建成功");
                refetch()
			}
			handleCancel();
		} catch (error) {
			toast.error(`操作失败: ${error}`);
		}
	};

	const handleDeleteDomain = async (domain: Domain) => {
		const confirmed = confirm(`确定要删除域名 ${domain.name} 吗？`);
		if (!confirmed) return;

		try {
			await deleteDomain(domain.id);
			toast.success("域名删除成功");
            refetch()
		} catch (error) {
			toast.error(`删除失败: ${error}`);
		}
	};

	if (!selectedProfile) {
		return (
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Globe className="w-5 h-5" />
						域名管理
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-center py-8 text-gray-500">
						<p>请先选择一个个人资料来管理域名。</p>
					</div>
				</CardContent>
			</Card>
		);
	}

	const currentDomains = selectedProfile.domains || [];

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle className="flex items-center gap-2">
							<Globe className="w-5 h-5" />
							{selectedProfile.name} - 域名管理
						</CardTitle>
						{!isEditing && (
							<Button onClick={handleCreateDomain} size="sm">
								<Plus className="w-4 h-4 mr-2" />
								添加域名
							</Button>
						)}
					</div>
				</CardHeader>
				<CardContent>
					{isEditing ? (
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="domain-name">域名名称 *</Label>
								<Input
									id="domain-name"
									placeholder="例如: vtuberabc.com"
									value={formData.name}
									onChange={(e) =>
										setFormData({ ...formData, name: e.target.value })
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="icp-license">ICP 备案号</Label>
								<Input
									id="icp-license"
									placeholder="例如: 粤ICP备12345678号-1"
									value={formData.icpLicenseNumber}
									onChange={(e) =>
										setFormData({ ...formData, icpLicenseNumber: e.target.value })
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="security-filing">公安备案号</Label>
								<Input
									id="security-filing"
									placeholder="例如: 粤公网安备 12345678901234567890 号"
									value={formData.publicSecurityFilingNumber}
									onChange={(e) =>
										setFormData({ ...formData, publicSecurityFilingNumber: e.target.value })
									}
								/>
							</div>
							<div className="flex gap-2">
								<Button onClick={handleSave}>
									{editingDomain ? "更新" : "创建"}
								</Button>
								<Button variant="outline" onClick={handleCancel}>
									取消
								</Button>
							</div>
						</div>
					) : currentDomains.length > 0 ? (
						<div className="space-y-4">
							{currentDomains.map((domain) => (
								<div key={domain.id} className="flex items-center justify-between p-4 border rounded-lg">
									<div className="space-y-2">
										<div className="font-semibold">{domain.name}</div>
										{domain.icpLicenseNumber && (
											<div className="text-sm text-gray-600">
												ICP备案: {domain.icpLicenseNumber}
											</div>
										)}
										{domain.publicSecurityFilingNumber && (
											<div className="text-sm text-gray-600">
												公安备案: {domain.publicSecurityFilingNumber}
											</div>
										)}
									</div>
									<div className="flex gap-2">
										<Button
											variant="outline"
											size="sm"
											onClick={() => handleEditDomain(domain)}
										>
											<Edit className="w-4 h-4" />
										</Button>
										<Button
											variant="outline"
											size="sm"
											onClick={() => handleDeleteDomain(domain)}
										>
											<Trash2 className="w-4 h-4" />
										</Button>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-8 text-gray-500">
							<p>该个人资料还没有配置域名。</p>
							<Button onClick={handleCreateDomain} className="mt-4">
								<Plus className="w-4 h-4 mr-2" />
								添加域名
							</Button>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
} 
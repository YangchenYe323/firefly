"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, X } from "lucide-react";
import type { ExternalLinkForEditOrCreate } from "./ExternalLinksPanel";

interface ExternalLinkFormProps {
	link: ExternalLinkForEditOrCreate;
	onSubmit: (data: ExternalLinkForEditOrCreate) => Promise<void>;
	onCancel: () => void;
}

export default function ExternalLinkForm({
	link,
	onSubmit,
	onCancel,
}: ExternalLinkFormProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState<ExternalLinkForEditOrCreate>(link);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		await onSubmit(formData);
		setIsLoading(false);
	};

	return (
		<Card className="border-2 border-dashed">
			<CardContent className="p-4">
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<Label htmlFor="value">显示文本</Label>
							<Input
								id="value"
								value={formData.link.value}
								onChange={(e) =>
									setFormData({
										...formData,
										link: { ...formData.link, value: e.target.value },
									})
								}
								placeholder="例如：主页, 直播间"
								required
							/>
						</div>
						<div>
							<Label htmlFor="icon">图标</Label>
							<Input
								id="icon"
								value={formData.link.icon ?? ""}
								onChange={(e) =>
									setFormData({
										...formData,
										link: { ...formData.link, icon: e.target.value },
									})
								}
								placeholder="例如：bilibili, tapechat"
							/>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<Label htmlFor="href">链接地址</Label>
							<Input
								id="href"
								value={formData.link.href}
								onChange={(e) =>
									setFormData({
										...formData,
										link: { ...formData.link, href: e.target.value },
									})
								}
								placeholder="https://example.com"
								required
							/>
						</div>
						<div>
							<Label htmlFor="displayOrder">显示顺序</Label>
							<Input
								id="displayOrder"
								type="number"
								value={formData.link.displayOrder}
								onChange={(e) =>
									setFormData({
										...formData,
										link: {
											...formData.link,
											displayOrder: Number.parseInt(e.target.value) || 0,
										},
									})
								}
								placeholder="0"
							/>
						</div>
					</div>
					<div className="flex gap-2">
						<Button
							type="submit"
							disabled={
								isLoading || !formData.link.value || !formData.link.href
							}
						>
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

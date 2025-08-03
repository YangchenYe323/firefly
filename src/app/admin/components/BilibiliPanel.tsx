"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Key } from "lucide-react";
import { toast } from "sonner";
import { getBilibiliWbiKeys } from "@/app/actions/v2/bilibili";

interface WbiKeys {
	img_key: string;
	sub_key: string;
}

export default function BilibiliPanel() {
	const [isLoading, setIsLoading] = useState(false);
	const [wbiKeys, setWbiKeys] = useState<WbiKeys | null>(null);

	const handleGetWbiKeys = async () => {
		setIsLoading(true);
		try {
			const result = await getBilibiliWbiKeys();
			if (result.success) {
				setWbiKeys(result.data);
				toast.success("成功获取 Bilibili WBI 密钥");
			} else {
				toast.error(`获取失败: ${result.error}`);
			}
		} catch (error) {
			toast.error("获取 WBI 密钥时发生错误");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Key className="w-5 h-5" />
						Bilibili WBI 密钥管理
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center gap-4">
						<Button 
							onClick={handleGetWbiKeys} 
							disabled={isLoading}
							className="flex items-center gap-2"
						>
							{isLoading ? (
								<RefreshCw className="w-4 h-4 animate-spin" />
							) : (
								<RefreshCw className="w-4 h-4" />
							)}
							获取 WBI 密钥
						</Button>
						{isLoading && <span className="text-sm text-muted-foreground">正在获取...</span>}
					</div>

					{wbiKeys && (
						<div className="space-y-3">
							<h4 className="font-medium text-sm">当前 WBI 密钥:</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<label className="text-xs font-medium text-muted-foreground">
										IMG Key
									</label>
									<div className="p-3 bg-muted rounded-md font-mono text-sm break-all">
										{wbiKeys.img_key}
									</div>
								</div>
								<div className="space-y-2">
									<label className="text-xs font-medium text-muted-foreground">
										SUB Key
									</label>
									<div className="p-3 bg-muted rounded-md font-mono text-sm break-all">
										{wbiKeys.sub_key}
									</div>
								</div>
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
} 
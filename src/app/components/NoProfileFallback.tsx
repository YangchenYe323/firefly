"use client";

import type { FC } from "react";
import { Settings, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NoProfileFallback: FC = () => {
	const handleNavigateToAdmin = () => {
		window.location.href = "/admin";
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
			<Card className="w-full max-w-md shadow-lg border-0 bg-white/80 backdrop-blur-sm">
				<CardHeader className="text-center pb-4">
					<div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
						<Settings className="w-8 h-8 text-slate-600" />
					</div>
					<CardTitle className="text-xl font-semibold text-slate-900">
                        没有主播资料
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="text-sm text-slate-500 text-center">
                        请前往后台管理界面创建主播资料
					</div>
					<Button 
						onClick={handleNavigateToAdmin}
						className="w-full bg-slate-900 hover:bg-slate-800 text-white transition-colors duration-200"
					>
						<Plus className="w-4 h-4 mr-2" />
                        创建主播资料
						<ArrowRight className="w-4 h-4 ml-2" />
					</Button>
					<div className="text-xs text-slate-400 text-center">
                        跳转至后台管理界面
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

NoProfileFallback.displayName = "NoProfileFallback";

export default NoProfileFallback; 
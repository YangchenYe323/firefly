"use client";

import { Provider } from "jotai/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

interface ProvidersProps {
	children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 60 * 1000, // 1 hour
						gcTime: 60 * 60 * 1000, // 1 hour
					},
				},
			}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			<Provider>{children}</Provider>
		</QueryClientProvider>
	);
}

"use client";

import Header from "@/components/header";
import { TaskTable } from "@/components/tasks";
import { logout } from "@/lib/api";
import { useAuth } from "@/lib/context/auth";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

const queryClient = new QueryClient();

export default function Home() {
	const { isAuthenticated } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isAuthenticated) {
			router.push("/auth");
			return;
		}
	}, [isAuthenticated, router]);

	return (
		<div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
			<Header title="Tasks Manager" onLogout={logout} />
			<QueryClientProvider client={queryClient}>
				<Suspense fallback={<div>Loading...</div>}>
					<TaskTable />
				</Suspense>
			</QueryClientProvider>
		</div>
	);
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/hooks/use-user";
import { ListTodo, LogOut } from "lucide-react";
import { Button } from "./ui/button";

interface User {
	name: string;
	email: string;
}

interface HeaderProps {
	title: string;
	onLogout: () => void;
}

const Header = ({ title, onLogout }: HeaderProps) => {
	const { getMe } = useUser();
	const { data: user, isLoading } = useQuery<User>({
		queryKey: ["me"],
		queryFn: () => getMe(),
	});

	return (
		<div className="flex justify-between items-center px-6 py-4 border-b bg-white">
			<div className="flex flex-row items-center space-x-2">
				<ListTodo />
				<h1 className="text-2xl font-semibold">{title}</h1>
			</div>

			{isLoading ? (
				<div className="flex items-center gap-3">
					<Skeleton className="w-10 h-10 rounded-full" />
					<div className="flex flex-col gap-1">
						<Skeleton className="w-24 h-4" />
						<Skeleton className="w-36 h-3" />
					</div>
				</div>
			) : user ? (
				<div className="flex items-center gap-3">
					<Avatar>
						<AvatarFallback>{user.name?.charAt(0) ?? "U"}</AvatarFallback>
					</Avatar>
					<div className="text-left">
						<p className="text-sm font-medium">{user.name}</p>
						<p className="text-xs text-muted-foreground">{user.email}</p>
					</div>
					<Button size="icon" onClick={onLogout}>
						<LogOut />
					</Button>
				</div>
			) : null}
		</div>
	);
};

export default Header;

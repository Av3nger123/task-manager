"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useAuthentication } from "@/hooks/use-auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function SignupForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const router = useRouter();

	const { register } = useAuthentication();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const name = (form.elements.namedItem("name") as HTMLInputElement).value;
		const email = (form.elements.namedItem("email") as HTMLInputElement).value;
		const password1 = (form.elements.namedItem("password1") as HTMLInputElement)
			.value;
		const password2 = (form.elements.namedItem("password2") as HTMLInputElement)
			.value;

		if (password1 != password2) {
			toast.error("Passwords do not match");
			return;
		}

		if (password1.length < 8) {
			toast.error("Please choose a password of length 8");
			return;
		}
		const promise = register(name, email, password1);
		toast.promise(promise, {
			loading: "Registering",
			success: () => {
				router.push("/auth");
				return "Registration Successful";
			},
			error: (err) => {
				return err?.response?.data?.error ?? "Failed to register ";
			},
		});
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Welcome to TasksManager</CardTitle>
					<CardDescription>
						Register yourself to use our platform
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form className="my-8" onSubmit={handleSubmit}>
						<LabelInputContainer className="mb-4">
							<Label htmlFor="name">First name</Label>
							<Input id="name" placeholder="Tyler" type="text" required />
						</LabelInputContainer>
						<LabelInputContainer className="mb-4">
							<Label htmlFor="email">Email Address</Label>
							<Input
								id="email"
								placeholder="projectmayhem@fc.com"
								type="email"
								required
							/>
						</LabelInputContainer>
						<LabelInputContainer className="mb-4">
							<Label htmlFor="password1">Password</Label>
							<Input
								id="password1"
								placeholder="••••••••"
								type="password1"
								required
							/>
						</LabelInputContainer>
						<LabelInputContainer className="mb-8">
							<Label htmlFor="password2">Re enter password</Label>
							<Input
								id="password2"
								placeholder="••••••••"
								type="password2"
								required
							/>
						</LabelInputContainer>

						<button
							className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
							type="submit"
						>
							Sign up &rarr;
							<BottomGradient />
						</button>
						<div className="mt-4 text-center text-sm">
							Already have an account?{" "}
							<a href="/auth" className="underline underline-offset-4">
								Login
							</a>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

const BottomGradient = () => {
	return (
		<>
			<span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
			<span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
		</>
	);
};

const LabelInputContainer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div className={cn("flex w-full flex-col space-y-2", className)}>
			{children}
		</div>
	);
};

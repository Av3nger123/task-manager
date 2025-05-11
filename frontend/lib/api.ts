// lib/api.ts
import axios from "axios";

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type Headers = { [key: string]: string };

export const logout = () => {
	console.log("Logging out ...");
	localStorage.removeItem("session");
	window.location.href = `/auth`;
};

export async function get(url: string, headers: Headers = {}) {
	try {
		headers["Authorization"] = `Bearer ${localStorage.getItem("session")}`;
		const response = await axios.get(url, {
			headers: { ...headers, "Content-Type": "application/json" },
		});
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response?.status == 403) {
			logout();
		} else {
			console.log(err);
			throw err;
		}
	}
}

export async function del(url: string, body: string, headers: Headers = {}) {
	try {
		headers["Authorization"] = `Bearer ${localStorage.getItem("session")}`;
		const response = await axios.delete(url, {
			data: body,
			headers,
		});
		if (response.status == 403) {
			logout();
		}
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response?.status == 403) {
			logout();
		} else {
			throw err;
		}
	}
}

export async function post(url: string, body: string, headers: Headers = {}) {
	try {
		console.log();
		headers["Authorization"] = `Bearer ${localStorage.getItem("session")}`;
		const response = await axios.post(url, body, {
			headers: {
				"Content-Type": "application/json",
				...headers,
			},
		});
		if (response.status == 403) {
			logout();
		}
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response?.status == 403) {
			logout();
		} else {
			console.log("Throwing error", err);
			throw err;
		}
	}
}
export async function put(url: string, body: string, headers: Headers = {}) {
	try {
		headers["Authorization"] = `Bearer ${localStorage.getItem("session")}`;
		const response = await axios.put(url, body, {
			headers: {
				"Content-Type": "application/json",
				...headers,
			},
		});
		if (response.status == 403) {
			logout();
		}
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response?.status == 403) {
			logout();
		} else {
			throw err;
		}
	}
}
export async function patch(url: string, body: string, headers: Headers = {}) {
	const token = localStorage.getItem("session");
	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
	}
	try {
		const response = await axios.patch(url, body, {
			headers: {
				"Content-Type": "application/json",
				...headers,
			},
		});
		if (response.status == 403) {
			logout();
		}
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response?.status == 403) {
			logout();
		} else {
			throw err;
		}
	}
}

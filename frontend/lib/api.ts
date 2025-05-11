// lib/api.ts
import axios from "axios";

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type Headers = { [key:string]: string }

const logout = () => {
	console.log("Logging out ...");
	sessionStorage.removeItem("session");
	window.location.href = `/login?ref=${window.location.pathname != "login" ? window.location.pathname : ""}`;
};

export async function get(url: string, headers: Headers = {}) {
	const token = sessionStorage.getItem("session");
	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
	}
	try {
		const response = await axios.get(url, {
			headers: { ...headers, "Content-Type": "application/json" },
		});
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response?.status == 403) {
			logout();
		} else {
			throw err;
		}
	}
}

export async function del(url: string, body: string, headers: Headers = {}) {
	const token = sessionStorage.getItem("session");
	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
	}
	try {
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
	const token = sessionStorage.getItem("session");
	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
	}
	try {
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
			throw err;
		}
	}
}
export async function put(url: string, body: string, headers: Headers = {}) {
	const token = sessionStorage.getItem("session");
	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
	}
	try {
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
	const token = sessionStorage.getItem("session");
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

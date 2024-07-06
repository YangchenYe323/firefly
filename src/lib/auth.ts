import { SignJWT, jwtVerify } from "jose";

import type { User } from "@/generated/client";

export function getJwtSecretKey() {
	const secret = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
	if (!secret) {
		throw new Error("JWT Secret key is not matched");
	}
	return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token: string) {
	try {
		const { payload } = await jwtVerify(token, getJwtSecretKey());
		return payload;
	} catch (error) {
		return null;
	}
}

export async function signNewJwtToken(user: User) {
	return await new SignJWT({
		username: user.username,
	})
		.setProtectedHeader({
			alg: "HS256",
		})
		.setIssuedAt()
		.setExpirationTime("30days")
		.sign(getJwtSecretKey());
}

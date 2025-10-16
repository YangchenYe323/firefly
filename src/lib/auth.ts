import { type JWTPayload, SignJWT, jwtVerify } from "jose";

import type { User } from "@prisma/client";
import { cookies } from "next/headers";

export type FireflyJwtPayload = JWTPayload & User;

export function getJwtSecretKey() {
	const secret = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
	if (!secret) {
		throw new Error("JWT Secret key is not matched");
	}
	return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token: string): Promise<FireflyJwtPayload | null> {
	try {
		const { payload } = await jwtVerify(token, getJwtSecretKey());
		return payload as FireflyJwtPayload;
	} catch (error) {
		return null;
	}
}

export async function signNewJwtToken(user: User) {
	return await new SignJWT(user)
		.setProtectedHeader({
			alg: "HS256",
		})
		.setIssuedAt()
		.setExpirationTime("30days")
		.sign(getJwtSecretKey());
}

export async function auth(): Promise<User | null> {
	const currentUser = (await cookies()).get("currentUser")?.value;
	const jwtVerified = currentUser && (await verifyJwtToken(currentUser));

	if (!jwtVerified) {
		return null;
	}

	return jwtVerified;
}
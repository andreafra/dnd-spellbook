import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"

import { PrismaClient } from "@prisma/client"

import { SHA3 } from "crypto-js"
import { toUUID } from "to-uuid"

const prisma = new PrismaClient()

const hashEmail = (email) =>
	toUUID(
		SHA3(email + process.env.CRYPTO_SALT, {
			outputLength: 128,
		}).toString()
	)

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async signIn({ user, profile }) {
			// If the account is not verified, don't allow login
			if (!profile.email_verified && !profile.verified) return false

			const userId = hashEmail(user.email)

			try {
				await prisma.user.upsert({
					where: {
						id: userId,
					},
					update: {},
					create: {
						id: userId,
						name: user.name,
					},
				})
			} catch {
				return false
			}

			return true
		},
		async session({ session, token }) {
			// Send properties to the client, like an access_token from a provider.
			session.accessToken = token.accessToken
			session.user.id = hashEmail(session.user.email)

			return session
		},
	},
})

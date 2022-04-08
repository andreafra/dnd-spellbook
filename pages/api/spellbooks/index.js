// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client"
import { getSession } from "next-auth/react"

const prisma = new PrismaClient()

export default async function handler(req, res) {

	const session = await getSession({ req })

	if (session) {
		const userSpellbooks = await prisma.user.findUnique({
			where: {
				id: session.user.id
			},
			include: {
				spellbooks: true,
			}
		})
		if (userSpellbooks) {
			res.status(200).json(userSpellbooks)
		} else {
			res.status(404).json({message: "Not found. Does this user exists?"})
		}
	} else {
		res.status(401).json({message: "Unauthorized. Please log in first."})
	}
}

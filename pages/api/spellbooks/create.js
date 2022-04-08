// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSession } from "next-auth/react"

const { PrismaClient } = require("@prisma/client")
const { v4: uuidv4 } = require("uuid")

const prisma = new PrismaClient()

const MAX_SPELLBOOKS = 3

export default async function handler(req, res) {
	const session = await getSession({ req })
	if (session) {
		const newSpellbook = {
			id: uuidv4(),
			title: req.body.title,
			owner_id: session.user.id,
			spells: JSON.stringify([]),
		}

		const user = await prisma.user.findUnique({
			where: {
				id: session.user.id,
			},
			include: {
				_count: {
					select: {
						spellbooks: true,
					},
				},
			},
		})

		console.log(user._count.spellbooks)

		if (user._count.spellbooks >= MAX_SPELLBOOKS) {
			res.status(403).json({ message: "Max spellbooks reached." })
			return
		}
		try {
			await prisma.spellbook.create({
				data: newSpellbook,
			})
			res.status(200).json({
				id: newSpellbook.id,
			})
		} catch {
			res.status(403).json({ message: "Couldn't create new spellbook." })
		}
	} else {
		res.status(401).json({ message: "Unauthorized. Please log in first." })
	}
}

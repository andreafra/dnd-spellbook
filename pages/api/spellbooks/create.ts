// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import config from "../../../config"
import { AppUser } from "../../../types/AppUser"

const { PrismaClient } = require("@prisma/client")
const { v4: uuidv4 } = require("uuid")

const prisma = new PrismaClient()

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession({ req })
	if (session) {
		const sessionUser: AppUser = session.user
		const newSpellbook = {
			id: uuidv4(),
			title: req.body.title,
			owner_id: sessionUser.id,
			spellIds: JSON.stringify([]),
		}

		const user = await prisma.user.findUnique({
			where: {
				id: sessionUser.id,
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

		if (user._count.spellbooks >= config.maxSpellbooks) {
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
			res.status(403).json({})
		}
	} else {
		res.status(401).json({})
	}
}

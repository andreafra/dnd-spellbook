import { Spellbook } from "@prisma/client"
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
		const newSpellbook: Spellbook = {
			id: uuidv4(),
			title: req.body.title,
			lastUpdated: new Date(),
			ownerId: sessionUser.id,
			spellIds: [],
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

		if (user._count.spellbooks >= config.maxSpellbooks) {
			res.status(403).end()
			return
		}
		try {
			await prisma.spellbook.create({
				data: newSpellbook,
			})
			res.status(200).end()
		} catch {
			res.status(500).end()
		}
	} else {
		res.status(401).end()
	}
}

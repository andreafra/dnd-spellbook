// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { AppUser } from "../../../types/AppUser"
import { parseSpellbook } from "../../../utils/parseSpellbook"

const prisma = new PrismaClient()

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession({ req })

	if (session) {
		// somehow, id can be a string or array, this way
		// we wrap it in an array anyway, and then flatten it
		// finally, we get the first element
		const id = [req.query.id].flat()[0]

		console.log(id)

		const sessionUser = session.user as AppUser
		const queryRes = await prisma.user.findUnique({
			where: {
				id: sessionUser.id,
			},
			select: {
				spellbooks: {
					where: {
						id: id,
					},
				},
			},
		})
		if (queryRes && queryRes.spellbooks[0]) {
			const spellbook = queryRes.spellbooks[0]
			// Check if user is owner
			if (spellbook.owner_id === sessionUser.id) {
				return res.status(200).json(parseSpellbook(spellbook))
			}
			return
		} else {
			return res.status(404).json({})
		}
	}
	res.status(401).json({})
}

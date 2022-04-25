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

		console.log(req.method)

		const sessionUser = session.user as AppUser
		const spellbook = await prisma.spellbook.findUnique({
			where: {
				id,
			},
		})
		if (spellbook) {
			// Check if user is owner
			// TODO: could this be a security issue? Can the user falsify the session?
			if (spellbook.owner_id === sessionUser.id) {
				// if method is GET, return spellbook object
				if (req.method === "GET") {
					return res.status(200).json(spellbook)
				}
				if (req.method === "PUT") {
					const updatedSpellbook = await prisma.spellbook.update({
						where: {
							id,
						},
						data: {
							last_updated: new Date().toISOString(),
							title: req.body.title,
							spellIds: req.body.spellIds,
						},
					})

					return res.status(200).json({})
				}
			}
			return
		} else {
			return res.status(404).json({})
		}
	}
	res.status(401).json({})
}

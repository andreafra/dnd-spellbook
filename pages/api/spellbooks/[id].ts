import { PrismaClient, Spellbook as DbSpellbook } from "@prisma/client"
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

		let spellbook: DbSpellbook

		const sessionUser = session.user as AppUser
		try {
			spellbook = await prisma.spellbook.findUnique({
				where: {
					id,
				},
			})
		} catch {
			// URL params are written wrong (not an UUID?)
			return res.status(400).end()
		}
		if (spellbook) {
			// Check if user is owner
			// TODO: could this be a security issue? Can the user falsify the session?
			if (spellbook.ownerId === sessionUser.id) {
				// if method is GET, return spellbook object
				if (req.method === "GET") {
					return res.status(200).json(parseSpellbook(spellbook))
				}
				if (req.method === "PUT") {
					try {
						await prisma.spellbook.update({
							where: {
								id,
							},
							data: {
								lastUpdated: new Date(),
								title: req.body.title,
								spellIds: req.body.spellIds,
							},
						})
					} catch {
						// Something wrong with the backend
						res.status(500).end()
					}

					// Empty body
					return res.status(204).end()
				}
				if (req.method === "DELETE") {
					try {
						await prisma.spellbook.delete({
							where: {
								id,
							},
						})
					} catch (err) {
						// Something wrong with the backend
						console.error(err)
						return res.status(500).end()
					}

					// Empty body
					return res.status(204).end()
				}
			}
			// Unauthorized access
			return res.status(401).end()
		} else {
			// Not found
			return res.status(404).end()
		}
	}
	// If there's no session, user is unauthorized
	// TODO: handle it through middleware?
	return res.status(401).end()
}

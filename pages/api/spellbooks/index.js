import { PrismaClient } from "@prisma/client"
import { getSession } from "next-auth/react"
import { parseSpellbook } from "../../../utils/parseSpellbook"

const prisma = new PrismaClient()

export default async function handler(req, res) {
	const session = await getSession({ req })

	if (session) {
		let userSpellbooks
		try {
			userSpellbooks = await prisma.user.findUnique({
				where: {
					id: session.user.id,
				},
				include: {
					spellbooks: true,
				},
			})
		} catch {
			// Not found
			res.status(404).end()
		}
		if (userSpellbooks) {
			res.status(200).json({ spellbooks: userSpellbooks.spellbooks })
		} else {
			// Not found
			res.status(404).end()
		}
	} else {
		// Unauthorized: user is not logged in
		res.status(401).end()
	}
}

import { Spellbook } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import config from "../../../config"
import { AppUser } from "../../../types/AppUser"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession({ req })
	if (session) {
		const sessionUser: AppUser = session.user
		try {
			const userData = await prisma.user.findUnique({
				where: {
					id: sessionUser.id,
				},
				include: {
					spellbooks: {
						where: {
							ownerId: sessionUser.id,
						},
					},
				},
			})

			res.status(200).json(userData)
		} catch (err) {
			console.error(err)
			res.status(500).end()
		}
	} else {
		res.status(401).end()
	}
}

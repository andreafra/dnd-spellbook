// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const { PrismaClient } = require("@prisma/client")
const { v4: uuidv4 } = require("uuid")

const prisma = new PrismaClient()

export default async function handler(req, res) {
	
	const count = await prisma.spellbook.deleteMany()

	res.status(200).json({count})
}

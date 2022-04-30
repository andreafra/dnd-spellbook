export interface ISpell {
	visible: boolean
	id: string
	name: string
	desc: string
	range: string
	components: string
	materials: string
	ritual: boolean
	concentration: boolean
	duration: string
	castingTime: string
	level: number
	school: string
	class: string[]
}

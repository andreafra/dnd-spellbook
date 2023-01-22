import {
	ChangeEvent,
	DetailedHTMLProps,
	Dispatch,
	InputHTMLAttributes,
	useEffect,
	useState,
} from "react"

interface Props {
	id: string
	label: string
	defaultValue?: string
	onChange: (value: string) => void
}

type FieldProps = Props &
	DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export function Field({ id, label, onChange, ...props }: FieldProps) {
	const [error, setError] = useState("")

	const _handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		const text = e.target.value
		setError(
			text.length === 0 ? "Please add a title for your spellbook." : ""
		)
		onChange(text)
	}

	return (
		<div
			className={`inline-block align-bottom  text-lg ${
				props.hidden ? "hidden" : ""
			}`}
		>
			<label htmlFor={id} className="block pl-4 font-bold">
				{label}
			</label>
			<input
				name={id}
				id={id}
				{...props}
				className={`rounded-xl  border-2 border-primaryLight-600 bg-primaryLight-50 py-2 px-4 font-medium text-primaryLight-800 outline-none transition-colors active:text-primaryLight-800  ${
					error !== ""
						? "border-red-500 bg-red-50 placeholder:text-red-300"
						: null
				}`}
				onChange={_handleOnChange}
			/>
			<p className="pl-4 text-sm text-red-600" hidden={error === null}>
				{error}
			</p>
		</div>
	)
}

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
			className={`inline-block w-full align-bottom text-lg md:min-w-fit ${
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
				className={`w-full rounded-xl border-2 border-primaryLight-600 bg-primaryLight-50 py-2 px-4 font-medium text-primaryLight-800 outline-none transition-colors active:text-primaryLight-800  ${
					error !== ""
						? "border-danger-500 bg-danger-50 placeholder:text-danger-300"
						: null
				}`}
				onChange={_handleOnChange}
			/>
			<p className="pl-4 text-sm text-danger-600" hidden={error === null}>
				{error}
			</p>
		</div>
	)
}

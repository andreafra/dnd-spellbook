interface CustomButtonProps {
	title: string
	icon?: JSX.Element
	disabled?: boolean
}

type ButtonProps = CustomButtonProps & React.HTMLAttributes<HTMLButtonElement>

const BaseButton = (props: ButtonProps) => (
	<button
		{...props}
		className={`mr-2 rounded-xl border-2 py-2 px-3 font-medium  transition-colors  ${props.className}`}
		disabled={props.disabled}
	>
		{props.icon && (
			<i className="mr-3 inline-block align-middle">{props.icon}</i>
		)}
		<span className="align-middle">{props.title}</span>
	</button>
)

export const Button = (props: ButtonProps) => (
	<BaseButton
		{...props}
		className={`border-transparent border-primaryLight-300 bg-primaryLight-50 text-primaryLight-800 active:bg-primaryLight-200 disabled:opacity-30 disabled:active:bg-transparent disabled:active:text-primaryLight-50`}
	/>
)

export const PrimaryButton = (props: ButtonProps) => (
	<BaseButton
		{...props}
		className={`border-primaryLight-600 bg-primaryLight-200 text-primaryLight-800 active:bg-primaryLight-800 active:text-primaryLight-200 disabled:opacity-30 disabled:active:bg-primaryLight-200 disabled:active:text-primaryLight-800`}
	/>
)

export const DangerButton = (props: ButtonProps) => (
	<BaseButton
		{...props}
		className={`border-red-800 bg-red-200 text-red-800 active:bg-red-800 active:text-red-200 disabled:opacity-30 disabled:active:bg-red-200 disabled:active:text-red-800`}
	/>
)

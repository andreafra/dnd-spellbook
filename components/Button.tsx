interface CustomButtonProps {
	title: string
	icon?: JSX.Element
	disabled?: boolean
}

type ButtonProps = CustomButtonProps & React.HTMLAttributes<HTMLButtonElement>

const BaseButton = (props: ButtonProps) => (
	<button
		{...props}
		className={`rounded-xl border-2 py-2 pl-3 pr-4 text-lg font-medium  transition-colors  ${props.className}`}
	>
		<span className="mr-2 inline-grid h-6 w-6 content-center align-middle">
			{props.icon}
		</span>
		<span className="align-middle">{props.title}</span>
	</button>
)

export const Button = (props: ButtonProps) => (
	<BaseButton
		{...props}
		className={` bg-primaryLight-50 text-primaryLight-800 active:bg-primaryLight-200 disabled:opacity-30 disabled:active:bg-transparent disabled:active:text-primaryLight-50 ${props.className}`}
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
		className={`border-danger-800 bg-danger-200 text-danger-800 active:bg-danger-800 active:text-danger-200 disabled:opacity-30 disabled:active:bg-danger-200 disabled:active:text-danger-800`}
	/>
)

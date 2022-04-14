export const Button = ({ icon = undefined, title, ...props }) => (
	<button
		{...props}
		className={`mr-2 rounded-xl border-2 border-primaryLight-600 bg-primaryLight-200 py-2 px-3 font-medium text-primaryLight-800 transition-colors active:bg-primaryLight-800 active:text-primaryLight-200 disabled:opacity-30 disabled:active:bg-primaryLight-200 disabled:active:text-primaryLight-800`}
	>
		{icon ? <i className="mr-3 inline-block align-middle">{icon}</i> : null}
		<span className="align-middle">{title}</span>
	</button>
)

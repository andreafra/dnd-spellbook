export const Button = ({ icon, title, ...props }) => (
    <button
        {...props}
        className={`bg-primaryLight-200 mr-2 rounded-xl py-2 px-3 border-2 border-primaryLight-600 text-primaryLight-800 font-medium active:bg-primaryLight-800 active:text-primaryLight-200 transition-colors ${icon ? "pl-3" : ""}`}
    >
        {icon ? <i className="inline-block align-middle mr-3">{icon}</i> : null}
        {title}
    </button>
);

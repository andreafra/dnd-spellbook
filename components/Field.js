export const Field = ({ id, label, ...props }) => (
    <div className="block md:inline-block align-bottom mr-2">
        <label htmlFor={id} className="block font-bold pl-4">
            {label}
        </label>
        <input
            name={id}
            id={id}
            {...props}
            className="bg-primaryLight-50  rounded-xl py-2 px-4 border-2 border-primaryLight-600 text-primaryLight-800 font-medium active:text-primaryLight-800 transition-colors outline-none" />
    </div>
);

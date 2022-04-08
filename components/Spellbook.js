import Link from "next/link";

export const Spellbook = ({ title, size, id, onClick = undefined }) => (
    <Link href={`/spellbooks/${id}`}>
        <a onClick={onClick} className="inline-block mr-4 mb-4 bg-gradient-to-tr from-red-500 to-red-700 h-64 w-52 rounded-xl border-l-8 border-red-900 text-white p-4">
            <h3 className="text-xl italic font-bold">{title}</h3>
            <p className="font-bold">Spells: {size}</p>
        </a>
    </Link>
);

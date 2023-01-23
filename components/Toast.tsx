import { XIcon } from "@heroicons/react/outline"
import {
	HTMLAttributes,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react"
import config from "../config"
import { useAppDispatch, useAppSelector } from "../store"
import {
	dequeueMessage,
	Message,
	MessageType,
} from "../store/reducers/settings"

export default function ToastProvider(): JSX.Element {
	const messageQueue = useAppSelector((state) => state.settings.messageQueue)
	const dispatch = useAppDispatch()

	if (messageQueue.length > 0) {
		return (
			<ul
				className="sticky
             bottom-0 mx-auto max-w-full space-y-2 overflow-x-hidden px-2 pb-2 md:max-w-sm md:px-0"
			>
				{messageQueue.map((msg, index) => (
					<Toast key={index} index={index} {...msg} />
				))}
			</ul>
		)
	}
	return <></>
}

interface ToastProps {
	text: string
	type: MessageType
	index: number
}

function Toast({ text, type, index }: ToastProps): JSX.Element {
	const [willUnmount, setWillUnmount] = useState(false)
	const dispatch = useAppDispatch()

	let timeout = useRef<ReturnType<typeof setTimeout>>()

	useLayoutEffect(() => {
		// Reset timeout
		clearTimeout(timeout.current)

		// After a moment from last input, dispatch search
		timeout.current = setTimeout(() => {
			setWillUnmount(true)
		}, config.toastDurationMilliseconds)
	}, [])

	return (
		<li
			className={`relative flex w-full ${
				willUnmount ? "animate-fadeOut" : "animate-fadeIn"
			} content-center rounded-xl border-2 py-2 pl-3 pr-4 font-bold ${getColor(
				type
			)} cursor-pointer overflow-hidden`}
			onAnimationEnd={() =>
				willUnmount && dispatch(dequeueMessage(index))
			}
			onClick={() => setWillUnmount(true)}
		>
			<XIcon className="mr-2 inline-block h-6 w-6" />

			{text}
		</li>
	)
}

const getColor = (type) => {
	switch (type) {
		case "WARNING":
			return "bg-warning-100 text-warning-500 border-warning-300 before:bg-warning-300"
		case "ERROR":
			return "bg-danger-100 text-danger-500 border-danger-300 before:bg-danger-300"
		case "PRIMARY":
			return "bg-primaryLight-100 text-primaryLight-500 border-primaryLight-300 before:bg-primaryLight-300"
		case "SUCCESS":
			return "bg-success-100 text-success-500 border-success-300 before:bg-success-300"
	}
}

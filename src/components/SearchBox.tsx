import { cn } from '@/utils/cn';
import { IoSearch } from 'react-icons/io5';

type Props = {
	className?: string;
	value: string;
	onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
	onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

export default function SearchBox(props: Props) {
	return (
		<form
			onSubmit={props.onSubmit}
			className={cn(
				'relative flex items-center justify-center h-10',
				props.className,
			)}>
			<input
				type="text"
				placeholder="Search"
				value={props.value}
				onChange={props.onChange}
				className="h-full px-3 py-2 border border-gray-400 w-60 rounded-l-md focus:outline-none"
			/>
			<button className="border text-2xl px-2.5 py-2  bg-gray-800 text-white  border-gray-400   h-full rounded-r-md hover:bg-gray-700 ">
				<IoSearch />
			</button>
		</form>
	);
}

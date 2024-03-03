import { cn } from '@/utils/cn';

export default function Container(props: React.HTMLProps<HTMLDivElement>) {
	return (
		<div
			{...props}
			className={cn(
				'flex w-full py-4 bg-white border shadow-sm rounded-xl',
				props.className,
			)}
		/>
	);
}

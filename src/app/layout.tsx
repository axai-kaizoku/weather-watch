'use client';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const queryClient = new QueryClient();

	return (
		<html lang="en">
			<Head>
				<title>Weather App </title>
				<meta
					name="description"
					content="A simple weather app"
				/>
			</Head>
			<QueryClientProvider client={queryClient}>
				<body className={inter.className}>
					<Navbar />
					<main className="min-h-screen bg-gray-100">{children}</main>
				</body>
			</QueryClientProvider>
		</html>
	);
}

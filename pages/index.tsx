import type { NextPage } from 'next';
import Head from 'next/head';
import style from '../styles/Home.module.css';
import Search from '../components/search';

const Home: NextPage = () => {
	return (
		<div className={`container ${style.container}`}> 
			<Head>
				<title>Minecraft Server Status</title>
				<meta name="description" content="Tool for check minecraft server status." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Search />
		</div>
	);
};

export default Home;

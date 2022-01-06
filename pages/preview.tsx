import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import style from '../styles/Home.module.css';
import Head from 'next/head';
import useSWR from 'swr';
import Search from '../components/search';
import { Table } from 'react-bootstrap';
import { formatString } from '../utils/formatString';
import { strToBool } from '../utils/stringToBool';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Preview: NextPage = () => {
	const router = useRouter();
	const { host, bedrock } = router.query;

	const { data } = useSWR(`/api/server?host=${host ?? undefined}&bedrock=${bedrock ?? undefined}`, fetcher);

	return (
		<div className={`container ${style.container}`}> 
			<Head>
				<title>Minecraft Server Status</title>
				<meta name="description" content="Tool for check minecraft server status." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Search value={`${host || ''}`} bedrock={`${strToBool(bedrock as string)}`} />

			{ (!data || data.name !== 'BAD REQUEST') ?
				<Table responsive>
					<tbody>
						<tr>
							<td>
								<b>
                                    IP
								</b>
							</td>

							<td>{ data ? `${data.message.ip}` : 'Loading' }</td>
						</tr>
						<tr>
							<td>
								<b>
                                    Edition
								</b>
							</td>

							<td>{ data ? `${data.message.edition ? formatString(data.message.edition) : ''}` : 'Loading' }</td>
						</tr>
						<tr>
							<td>
								<b>
                                    Players
								</b>
							</td>

							<td>{ data ? `${data.message.playersOnline}/${data.message.playersMax}` : 'Loading' }</td>
						</tr>
						<tr>
							<td>
								<b>
                                    Version Name
								</b>
							</td>

							<td>{ data ? `${data.message.versionName}` : 'Loading' }</td>
						</tr>
						<tr>
							<td>
								<b>
                                    Version Protocol
								</b>
							</td>

							<td>{ data ? `${data.message.versionProtocol}` : 'Loading' }</td>
						</tr>
						<tr>
							<td>
								<b>
                                    Motd
								</b>
							</td>

							<td style={{ whiteSpace: 'pre-line' }}>{ data ? `${data.message.motd ? data.message.motd.clean : ''}` : 'Loading' }</td>
						</tr>
					</tbody>
				</Table>
				: 
				<b>Server is offline.</b>
			}
		</div>
	);
};

export default Preview;
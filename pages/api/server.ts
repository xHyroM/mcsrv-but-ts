// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import * as util from 'minecraft-server-util';
import { strToBool } from '../../utils/stringToBool';

const options = {
    enableSRV: true
};

type MCServerResponse = {
    edition: MCServerEdition;
    ip: string;
    versionName: string;
    versionProtocol: number;
    playersOnline: number;
    playersMax: number;
    motd: MCServerMotd;
    favicon: string;
    bedrock?: MCServerBedrock;
}

type MCServerEdition = 'BEDROCK' | 'JAVA'

type MCServerBedrock = {
    serverId: string;
    gameMode: string;
    gameModeId: number;
}

type MCServerMotd = {
    raw: string;
    clean: string;
    html: string;
}

type Data = {
    name: string;
    message: string | MCServerResponse;
}

const handler = async(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
    if (!req.query.host) return res.status(422).json({ name: 'UNPROCESSABLE ENTITY', message: 'Invalid query parameter host' });

    if (req.query.host.includes(':')) {
        req.query.port = (req.query.host as string).split(':')[1];
        req.query.host = (req.query.host as string).split(':')[0];
    }

    if (!req.query.port) {
        if (strToBool(req.query.bedrock as string)) req.query.port = '19132';
        else req.query.port = '25565';
    }

    const status = strToBool(req.query.bedrock as string) ? await util.statusBedrock(req.query.host as string, Number(req.query.port), options).catch(e => e) : await util.status(req.query.host as string, Number(req.query.port), options).catch(e => e);

    if (!status.version) {
        return res.status(400).json({ name: 'BAD REQUEST', message: status });
    }

	res.status(200).json({
        name: 'OK',
        message: {
            edition: status.edition ? 'BEDROCK' : 'JAVA',
            ip: req.query.host as string,
            versionName: status.version.name,
            versionProtocol: status.version.protocol,
            playersOnline: status.players.online,
            playersMax: status.players.max,
            motd: {
                raw: status.motd.raw,
                clean: status.motd.clean,
                html: status.motd.html
            },
            favicon: status.favicon,
            bedrock: {
                serverId: status.serverID,
                gameMode: status.gameMode,
                gameModeId: status.gameModeID
            }
        }
    });
}

export default handler;
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import * as util from 'minecraft-server-util';

const options = {
    timeout: 1000 * 5,
    enableSRV: true
};

type MCServerResponse = {
    ip: string;
    versionName: string;
    versionProtocol: number;
}

type Data = {
    name: string;
    message: string | MCServerResponse;
}

const handler = async(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
    const status = await util.status(req.query.host as string, Number(req.query.port), options).catch(e => e);

    if (!status.version) {
        return res.status(400).json({ name: 'BAD REQUEST', message: status });
    }

    console.log(status)
	res.status(200).json({
        name: 'OK',
        message: {
            ip: req.query.host as string,
            versionName: status.version.name,
            versionProtocol: status.version.protocol
        }
    });
}

export default handler;
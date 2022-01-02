import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Preview: NextPage = () => {
    const router = useRouter()
    const { host, bedrock } = router.query

    const { data, error } = useSWR(`/api/server?host=${host}&bedrock=${bedrock}`, fetcher)

    return (
        <div>
            { data ? data.message.ip : 'Loading...' }
        </div>
    )
}

export default Preview;
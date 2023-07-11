import React from "react";
import useFetch from "../../Hooks/useFetch";
import { STATS_GET } from "../../api";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import Head from "../Helper/Head";

// Lazy load
const UserStatsGraphs = React.lazy(() => import("./UserStatsGraphs"));

const UserStats = () => {
    const {data, error, loading, request} = useFetch();

    /** Get stats data */
    React.useEffect(() => {
        async function getData() {
            const token = window.localStorage.getItem("token");

            if (token) {
                const {url, options} = STATS_GET(token);
                
                await request(url, options);
            }
        }

        getData();
    }, []);

    if (error) return <Error error={error} />
    
    if (loading) return <Loading />

    if (data) {
        return (
            <React.Suspense fallback={<div></div>}>
                <Head title="Estatísticas" description="Página de estatísticas de acessos às fotos." />
                <UserStatsGraphs data={data} />
            </React.Suspense>
        )
    }

    else return null;
}

export default UserStats
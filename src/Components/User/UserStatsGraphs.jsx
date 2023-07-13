import React from "react";
import {VictoryPie, VictoryChart, VictoryBar} from "victory";
import PropTypes from "prop-types";
import styles from "./UserStatsGraphs.module.css";

const UserStatsGraphs = ({data}) => {
    const [graph, setGraph] = React.useState([]);
    const [total, setTotal] = React.useState(0);

    React.useEffect(() => {
        /** Transform data to graph data format */
        const graphData = data.map((item) => {
            return {
                x: item.title,
                y: Number(item.views)
            }
        })

        setGraph(graphData);

        /** Sum total views */
        setTotal(
            data.map(({views}) => Number(views))
            .reduce((acc, curr) => acc + curr, 0)
        );
    }, [data]);

    return (
        <section className={`${styles.graph} animeLeft`}>
            <div className={`${styles.total} ${styles.graphItem}`}>
                <p>
                    Acessos: {total}
                </p>
            </div>

            {/* Graphs */}
            {total > 0 &&
                <>
                    <div className={styles.graphItem}>
                        <VictoryPie data={graph}
                            innerRadius={50}
                            padding={{top: 20, right: 80, bottom: 20, left: 80}}
                            style={{
                                data: {
                                    fillOpacity: .9,
                                    stroke: "#FFF",
                                    strokeWidth: 2
                                },
                                labels: {
                                    fontSize: 14,
                                    fill: "#333"
                                }
                            }} />
                    </div>
                    <div className={styles.graphItem}>
                        <VictoryChart>
                            <VictoryBar data={graph} alignment="start" />
                        </VictoryChart>
                    </div>
                </>
            }   
        </section>
    )
}

UserStatsGraphs.propTypes = {
    data: PropTypes.array.isRequired,
}

export default UserStatsGraphs
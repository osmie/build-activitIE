import React from "react";
import { useFetch } from "./hooks";


import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryGroup,
  VictoryScatter,
  VictoryTooltip
} from "victory";

const NodeCount = props => {
  const {startDate} = props
  const url = `https://tasks.openstreetmap.ie/tracker_api/daily_stats?startDate=${startDate || '2021-02-01'}`;
  const { status, data, error } = useFetch(url);

  return (
    <div>
      {data && (
        <VictoryChart domainPadding={20} scale={{ x: "time" }} height={200}>
          <VictoryAxis
            label="Day"
            fixLabelOverlap
            style={{
              axis: { stroke: "#756f6a" },
              axisLabel: { fontSize: 12, padding: 40 },
              grid: { stroke: "grey" },
              ticks: { stroke: "grey", size: 5 },
              tickLabels: { fontSize: 12, padding: 5 },
            }}
            
          />
          <VictoryAxis 
            dependentAxis 
            label="Count" 
            style={{
              axisLabel: { fontSize: 12, padding: 40 },
              grid: { stroke: "grey" },
              ticks: { stroke: "grey", size: 5 },
              tickLabels: { fontSize: 12, padding: 5 },
            }}
            />
          <VictoryGroup 
            scale={{ x: "time" }}
          >
            <VictoryLine
              x="date"
              // data accessor for y values
              y="create"
              data={data.map((d) => {
                return {
                  date: new Date(d.date),
                  create: d.create,
                };
              })}
              style={{
                data: { stroke: "#229022" },
                parent: { border: "1px solid #ccc"}
              }}
            />
            <VictoryScatter
              x="date"
              // data accessor for y values
              y="create"
              data={data.map((d) => {
                return {
                  date: new Date(d.date),
                  create: d.create,
                };
              })}
              
              size={({ active }) => active ? 6 : 3}
              style={{
                data: {
                  stroke: "#229022",
                  strokeWidth: 2,
                  fill: "#fff"
                }
              }}
              labelComponent={<VictoryTooltip
                cornerRadius={0}
                flyoutStyle={{
                  stroke: "#868C97",
                  strokeWidth: 0,
                  fill: "rgb(255,238,238)",
                  opacity: 0.8
                }}
                style={{
                  fill: "#000",
                  fontSize: 12,
                  fontWeight: 600,
                  textAnchor: "middle"
                }}
                />}
              labels={({ datum }) => `Created: ${datum.create}`}
            />
          </VictoryGroup>
          <VictoryGroup 
            scale={{ x: "time" }}
          >
            <VictoryLine
              x="date"
              // data accessor for y values
              y="modify"
              data={data.map((d) => {
                return {
                  date: new Date(d.date),
                  modify: d.modify,
                };
              })}
              style={{
                data: { stroke: "#FFB347" },
                parent: { border: "1px solid #ccc"}
              }}
            />
            <VictoryScatter
              x="date"
              // modify accessor for y values
              y="modify"
              data={data.map((d) => {
                return {
                  date: new Date(d.date),
                  modify: d.modify,
                };
              })}
              
              size={({ active }) => active ? 6 : 3}
              style={{
                data: {
                  stroke: "#FFB347",
                  strokeWidth: 2,
                  fill: "#fff"
                }
              }}
              labelComponent={<VictoryTooltip
                cornerRadius={0}
                flyoutStyle={{
                  stroke: "#868C97",
                  strokeWidth: 0,
                  fill: "rgb(255,238,238)",
                  opacity: 0.8
                }}
                style={{
                  fill: "#000",
                  fontSize: 12,
                  fontWeight: 600,
                  textAnchor: "middle"
                }}
                />}
              labels={({ datum }) => `modify: ${datum.modify}`}
            />
          </VictoryGroup>
          <VictoryGroup 
            scale={{ x: "time" }}
          >
            <VictoryLine
              x="date"
              // data accessor for y values
              y="delete"
              data={data.map((d) => {
                return {
                  date: new Date(d.date),
                  delete: d.delete,
                };
              })}
              style={{
                data: { stroke: "#FF6961" },
                parent: { border: "1px solid #ccc"}
              }}
            />
            <VictoryScatter
              x="date"
              // delete accessor for y values
              y="delete"
              data={data.map((d) => {
                return {
                  date: new Date(d.date),
                  delete: d.delete,
                };
              })}
              
              size={({ active }) => active ? 6 : 3}
              style={{
                data: {
                  stroke: "#FF6961",
                  strokeWidth: 2,
                  fill: "#fff"
                }
              }}
              labelComponent={<VictoryTooltip
                cornerRadius={0}
                flyoutStyle={{
                  stroke: "#868C97",
                  strokeWidth: 0,
                  fill: "rgb(255,238,238)",
                  opacity: 0.8
                }}
                style={{
                  fill: "#000",
                  fontSize: 12,
                  fontWeight: 600,
                  textAnchor: "middle"
                }}
                />}
              labels={({ datum }) => `delete: ${datum.delete}`}
            />
          </VictoryGroup>
          
        </VictoryChart>
      )}
    </div>
  );
}

export default NodeCount;

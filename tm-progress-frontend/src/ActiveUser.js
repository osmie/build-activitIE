import React, { useState } from "react";
import { useFetch } from "./hooks";
import styled from "styled-components";
import { parseJSON, formatDistance } from "date-fns";
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryGroup,
  VictoryScatter,
  VictoryTooltip
} from "victory";

function ActiveUsers() {
  const url = `https://tasks.openstreetmap.ie/tracker_api/daily_stats?startDate=2021-02-01`;
  const { status, data, error } = useFetch(url);

  return (
    <div>
      {/* {data && JSON.stringify(data, null, 2)} */}
      {data && (
        <VictoryChart domainPadding={15} scale={{ x: "time" }} height={200}>
          <VictoryAxis
            label="Day"
            fixLabelOverlap
            style={{
              axis: { stroke: "#756f6a" },
              axisLabel: { fontSize: 12, padding: 30 },
              grid: { stroke: "grey" },
              ticks: { stroke: "grey", size: 5 },
              tickLabels: { fontSize: 12, padding: 5 },
            }}
            
          />
          <VictoryAxis 
            dependentAxis 
            label="User Count" 
            style={{
             
              axisLabel: { fontSize: 12, padding: 30 },
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
              y="numusersperday"
              data={data.map((d) => {
                return {
                  date: new Date(d.date),
                  numusersperday: d.numusersperday,
                };
              })}
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc"}
              }}
            />
            <VictoryScatter
              x="date"
              // data accessor for y values
              y="numusersperday"
              data={data.map((d) => {
                return {
                  date: new Date(d.date),
                  numusersperday: d.numusersperday,
                };
              })}
              
              size={({ active }) => active ? 6 : 3}
              style={{
                data: {
                  stroke: "#c43a31",
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
              labels={({ datum }) => `Members: ${datum.numusersperday}`}
            />
          </VictoryGroup>
          
        </VictoryChart>
      )}
    </div>
  );
}

export default ActiveUsers;

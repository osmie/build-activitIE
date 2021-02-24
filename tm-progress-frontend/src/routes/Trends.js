import React from "react";

import ActiveUsers from "../ActiveUser";
import NodeCount from "../NodeCount";
import UserLeaderboard from '../UserLeaderboard'

export const Trends = () => {
  return (
    <>
    <div style={{ padding: "2rem 0" }}>
              <h2>Longterm trends</h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  padding: "1rem 0",
                }}
              >
                <div>
                  <span>
                    <strong>Daily Active Users</strong>
                  </span>
                  <ActiveUsers startDate={'2020-01-01'} />
                </div>
                <div>
                  <span>
                    <strong>Daily Contributions</strong>
                  </span>
                  <NodeCount startDate={'2020-01-01'}/>
                </div>
                <div>
                  <span>
                    <strong>TBC</strong>
                  </span>
                </div>
              </div>
              <UserLeaderboard startDate={'2020-01-01'} />
            </div>
    </>
  )
}
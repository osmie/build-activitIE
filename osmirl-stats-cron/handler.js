"use strict";
const got = require("got");
const limit = require("p-limit")(5);
const {
  getProjects,
  getProjectRecentActivity,
  getProject,
} = require("./lib/tm3");
const uploadObjectToS3Bucket = require('./lib/s3')

module.exports.run = async (event) => {
  const projects = await getProjects();
  for (let index = 0; index < projects.length; index++) {
    const result = await getProjectRecentActivity(projects[index].projectId);
    const projectDetails = await getProject(projects[index].projectId);
    projects[index].activity = result;
    projects[index].lastUpdated = projectDetails.lastUpdated;
  }
  const final = {
    lastUpdated: new Date().toJSON(),
    stats: projects,
  };

  console.log('Got the api results', final)
  await uploadObjectToS3Bucket('tm3-tasks.json', JSON.stringify(final))
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  return {
    message: "Go Serverless v1.0! Your function executed successfully!",
    event,
  };
};

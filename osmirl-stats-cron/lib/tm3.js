const got = require("got");
const limit = require("p-limit")(5);

// const uploadObjectToS3Bucket = require('../s3')


/**
 * Methods to grab data from tasking manager version 3
 */

API_URL = "https://tasks.openstreetmap.ie";
VERSION = "v1";
TOKEN = "Token "

const getProjects = async () => {
  let qs = {
    page: 1,
    mapperLevel: 'ALL',
    projectStatuses: 'PUBLISHED,ARCHIVED'
  };

  let firstResp = await got(`${API_URL}/api/${VERSION}/project/search`, {
    headers: { "Accept-Language": "en-US,en;q=0.9", "Authorization": TOKEN },
    searchParams: qs,
  }).json();

  let json = firstResp;
  let projects = json.results;

  let numPages = json.pagination.pages;

  let promises = [];
  for (let i = 2; i <= numPages; i++) {
    qs.page = i;
    promises.push(
      limit(() =>
        got(`${API_URL}/api/${VERSION}/project/search`, {
          headers: { "Accept-Language": "en-US,en;q=0.9", "Authorization": TOKEN },
          searchParams: qs,
        }).json()
      )
    );
  }

  return Promise.all(promises).then(responses => {
    responses.forEach(response => {
      let results = response.results
      results.forEach(project => {
        projects.push(project)
      })
    })

    return projects
  })
};

const getProject = async (id) => {
  try {
    return await got(`${API_URL}/api/${VERSION}/project/${id}?as_file=false`).json()
  } catch (error) {
    console.log('Error No project details found for: ', id)
    if (error.response.statusCode === 404) {
      return {lastUpdated: null}
    }
  }
}

const getProjectRecentActivity = async (id) => {
  try {
    const result = await got(`${API_URL}/api/${VERSION}/stats/project/${id}/activity`, {
      retry: 0
    }).json()
    delete result.pagination
    return result.activity
  } catch (error) {
    console.log('No Activity found for ', id)
    if (error.response.statusCode === 404) {
      return []
    }
  }
}

module.exports = {getProjects, getProjectRecentActivity, getProject}
# OSM IRL Task Manager scraper

This folder contains the serverless functions used for scraping [tasks.openstreetmap.ie](http://tasks.openstreetmap.ie/)

# Deployed

Currently the function is deployed to AWS Lambda. It's set to run as a cron function on **15 minute** interval.

The public file is available at [https://osmirl-progress.s3-eu-west-1.amazonaws.com/tm3-tasks.json](https://osmirl-progress.s3-eu-west-1.amazonaws.com/tm3-tasks.json)

# Development

**Requirements**

- Serverless
- Node JS 12+
- AWS Account and S3 bucket

1. Install serverless

```bash
# Install and Configure serverless (https://serverless.com/framework/docs/providers/aws/guide/credentials/)
$ npm install serverless -g 
```

2. Install the project dependencies.

```bash
npm install
```

3. Ensure you have an S3 Bucket setup and it's name added to [`./serverless.yml`](./serverless.yml) and [`./lib/tm3.js`](./lib/tm3.js)

  - this is used for uploading the final json


4. Invoke the function locally. Serverless has some special functionality to mimic AWS (or other cloud providers locally)

```
serverless invoke local --function cron
```

# Deployment

```bash
serverless deploy
```
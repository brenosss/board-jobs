import falcon
import requests
import json
from falcon_cors import CORS


class JobsResource:
    def _get_job_filters(self, params):
        jobs_filter = {}
        description = params.get('technology')
        location = params.get('city')
        if description and description != 'all':
            jobs_filter['description'] = description
        if location and location != 'all':
            jobs_filter['location'] = location
        return jobs_filter

    def on_get(self, req, resp):
        jobs_filter = self._get_job_filters(req.params)
        resp.status = falcon.HTTP_200
        response = requests.get('https://jobs.github.com/positions.json', params=jobs_filter)
        resp.body = response.content


cors = CORS(allow_origins_list=['http://localhost:1234', 'http://127.0.0.1:1234'])
api = application = falcon.API(middleware=[cors.middleware])


jobs = JobsResource()

api.add_route('/jobs', jobs)

import datetime
import falcon
import requests
import json
from falcon_cors import CORS
from database.queries import save_search


class JobsResource:
    def _get_job_filters(self, params):
        jobs_filter = {}
        for key, value in params.items():
            if value != 'all':
                jobs_filter[key] = value
        return jobs_filter

    def on_get(self, req, resp):
        search_data = {
            'time': datetime.datetime.now(),
            'ip': req.access_route[0],
            **req.params
        }
        save_search(search_data)
        jobs_filter = self._get_job_filters(req.params)
        response = requests.get('https://jobs.github.com/positions.json', params=jobs_filter)
        resp.status = falcon.HTTP_200
        resp.body = response.content


cors = CORS(allow_origins_list=['http://localhost:1234', 'http://127.0.0.1:1234'])
api = application = falcon.API(middleware=[cors.middleware])


jobs = JobsResource()

api.add_route('/jobs', jobs)

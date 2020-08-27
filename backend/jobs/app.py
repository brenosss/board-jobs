import falcon
import requests
import json
from falcon_cors import CORS


class JobsResource:
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        response = requests.get('https://jobs.github.com/positions.json')
        resp.body = response.content


cors = CORS(allow_origins_list=['http://localhost:1234', 'http://127.0.0.1:1234'])
api = application = falcon.API(middleware=[cors.middleware])


jobs = JobsResource()

api.add_route('/jobs', jobs)

import sqlalchemy as db
from .schema import searches
from .connection import engine


def save_search(search_data):
    query = db.insert(searches).values(**search_data)
    engine.connect().execute(query)

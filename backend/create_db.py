from database.schema import searches, engine
from sqlalchemy.exc import OperationalError


try:
    searches.create(bind=engine)
    print('table searches created')
except OperationalError as ex:
    print('table searches already exists')

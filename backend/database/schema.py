from sqlalchemy import Column, Integer, MetaData, Table, String, DateTime
from .connection import engine

metadata = MetaData()
searches = Table(
    'searches', metadata,
    Column('id', Integer, primary_key=True),
    Column('description', String(50)),
    Column('location', String(50)),
    Column('ip', String(50)),
    Column('time', DateTime()),
)

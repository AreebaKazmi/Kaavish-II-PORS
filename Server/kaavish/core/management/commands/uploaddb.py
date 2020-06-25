from io import StringIO

from django.apps import apps
from django.conf import settings
from django.core.management import call_command
from django.core.management.base import BaseCommand
from django.db import connection

from ...utils.upload_data import (
    create_uploads_by_schema,
)


class Command(BaseCommand):
    help = "Populate database with uploads from the uploads folder"
    uploads_dir = "kaavish/static/uploads/images/" #remove static/uploads ki directory


    def handle(self, *args, **options):
        create_uploads_by_schema(self.uploads_dir)
        self.stdout.write("Created Uploads")

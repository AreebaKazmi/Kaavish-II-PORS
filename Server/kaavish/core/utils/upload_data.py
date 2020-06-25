import itertools
import json
import os
import random
import unicodedata
import uuid
from collections import defaultdict
from typing import Type, Union
from unittest.mock import patch

from django.conf import settings
from django.contrib.sites.models import Site
from django.core.files import File
from django.utils import timezone

from ...userupload.models import (
	Item,
)

from ...userupload.thumbnails import (
	create_upload_thumbnails,
)

import jsonlines as jl

# fix this pipeline, update models of userupload item, sirf image bhi chlegi

def create_uploads(uploads_data, placeholder_dir):
	for upload in uploads_data:
		pk = upload["pk"]

		defaults = upload["fields"]
		set_field_as_money(defaults, "price")
		defaults["weight"] = get_weight(defaults["weight"])
		defaults["category_id"] = defaults.pop("category")
		defaults["upload_type_id"] = defaults.pop("upload_type")

		gen_upload, _ = Upload.objects.update_or_create(pk=pk, defaults=defaults)

		images = IMAGES_MAPPING.get(pk, [])
		for image_name in images:
			create_product_image(gen_product, placeholder_dir, image_name)


def create_uploads_by_schema(placeholder_dir, create_images):
	path = os.path.join(
		settings.PROJECT_ROOT, "kaavish", "static", "scrapers", "datasets", "Refined", "clean_data.json"
	)
	with open(path) as f:
		db_items = json.load(f)
	types = defaultdict(list)
	# Sort db objects by its model
	for item in db_items:
		model = item.pop("model")
		types[model].append(item)

	create_uploads(
		upload_data=types["userupload.item"],
		placeholder_dir=placeholder_dir,
	)
from ..celeryconf import app
from ..core.utils import create_thumbnails
from .models import Item


@app.task
def create_upload_thumbnails(image_id):
    """Take a UserUpload model and create thumbnails for it."""
    create_thumbnails(pk=image_id, model=Item, size_set="useruploads")
from django.db import models
from django.utils.text import slugify
from django.utils.translation import pgettext_lazy

from ..core.models import (
    ModelWithMetadata,
    PublishableModel,
    PublishedQuerySet,
    SortableModel,
)

from versatileimagefield.fields import PPOIField, VersatileImageField

class Item(models.Model):
    name = models.CharField(max_length=128, null=True)
    url = models.URLField(max_length=299, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    image = VersatileImageField(upload_to="useruploads", ppoi_field="ppoi", blank=False)

    class Meta:
        app_label = "userupload"
        ordering = ("name",)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse(
            "items:details", kwargs={"slug": self.get_slug(), "item_id": self.id}
        )

    def get_slug(self):
        return slugify(smart_text(unidecode(self.name)))

    def get_image(self):
        images = list(self.image.all())
        return images[0] if images else None
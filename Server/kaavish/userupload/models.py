from django.db import models
from django.utils.text import slugify
from django.utils.translation import pgettext_lazy

from ..seo.models import SeoModel, SeoModelTranslation

from ..core.models import (
    ModelWithMetadata,
    PublishableModel,
    PublishedQuerySet,
    SortableModel,
)

from versatileimagefield.fields import PPOIField, VersatileImageField

class Item(models.Model):
    filename = models.CharField(max_length=128)
    url = models.URLField(max_length=299, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    image = VersatileImageField(upload_to="useruploads", ppoi_field="ppoi", blank=False)

    class Meta:
        app_label = "userupload"
        ordering = ("filename",)
        permissions = (
            (
                "manage_items",
                pgettext_lazy("Permission description", "Manage items."),
            ),
        )

    def __str__(self):
        return self.filename

    def get_absolute_url(self):
        return reverse(
            "items:details", kwargs={"slug": self.get_slug(), "item_id": self.id}
        )

    def get_slug(self):
        return slugify(smart_text(unidecode(self.filename)))

    def get_image(self):
        images = list(self.image.all())
        return images[0] if images else None
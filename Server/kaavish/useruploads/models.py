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

class UploadedImage(SortableModel):
    image = VersatileImageField(upload_to="useruploads", ppoi_field="ppoi", blank=False)
    ppoi = PPOIField()
    alt = models.CharField(max_length=128, blank=True)

    class Meta:
        ordering = ("sort_order",)
        app_label = "useruploads"

    def get_ordering_queryset(self):
        return self.upload.images.all()


class UserUpload(SeoModel, ModelWithMetadata, PublishableModel):
    filename = models.CharField(max_length=128)

    url = models.URLField(max_length=299, blank=True, null=True)

    updated_at = models.DateTimeField(auto_now=True, null=True)

    image = models.OneToOneField(
        UploadedImage,
        on_delete=models.CASCADE,
        primary_key=True,
    )

    class Meta:
        app_label = "upload"
        ordering = ("filename",)
        permissions = (
            (
                "manage_uploads",
                pgettext_lazy("Permission description", "Manage uploads."),
            ),
        )

    def __iter__(self):
        if not hasattr(self, "__variants"):
            setattr(self, "__variants", self.variants.all())
        return iter(getattr(self, "__variants"))

    def __repr__(self):
        class_ = type(self)
        return "<%s.%s(pk=%r, name=%r)>" % (
            class_.__module__,
            class_.__name__,
            self.pk,
            self.filename,
        )

    def __str__(self):
        return self.filename


    def get_absolute_url(self):
        return reverse(
            "useruploads:details", kwargs={"slug": self.get_slug(), "upload_id": self.id}
        )

    def get_slug(self):
        return slugify(smart_text(unidecode(self.filename)))

    def get_image(self):
        images = list(self.images.all())
        return images[0] if images else None



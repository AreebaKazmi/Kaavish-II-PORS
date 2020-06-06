import graphene
from django.core.exceptions import ValidationError
from django.utils.text import slugify
from ...userupload import models
from ..core.mutations import ModelDeleteMutation, ModelMutation
from ..core.types.common import UploadErrorCode
from ..core.types import Upload
from .types import Item
import graphene


class ItemInput(graphene.InputObjectType):
    name = graphene.String(description="Item upload name/filename.")
    url =  graphene.String(description="Item upload URL")
    image = Upload(
        required=True, description="Represents an image file in a multipart request."
    )
    updated_at = graphene.Date(description="Publication date. ISO 8601 standard.")


class ItemCreate(ModelMutation):
    class Arguments:
        input = ItemInput(
            required=True, description="Fields required to create a Item."
        )

    class Meta:
        description = "Creates a new item/userupload."
        model = models.Item

    @classmethod
    def clean_input(cls, info, instance, data):
        cleaned_input = super().clean_input(info, instance, data)
        # slug = cleaned_input.get("slug", "")
        # if not slug:
        #     cleaned_input["slug"] = slugify(cleaned_input["title"])
        # clean_seo_fields(cleaned_input)
        return cleaned_input


class ItemUpdate(ItemCreate):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a Item to update.")
        input = ItemInput(
            required=True, description="Fields required to update a Item."
        )

    class Meta:
        description = "Updates an existing Item."
        model = models.Item


class ItemDelete(ModelDeleteMutation):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a Item to delete.")

    class Meta:
        description = "Deletes a Item."
        model = models.Item
        permissions = ("Item.manage_Items",)

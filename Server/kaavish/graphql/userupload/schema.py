import graphene

from ..core.fields import FilterInputConnectionField
from ..decorators import permission_required

from .mutations import ItemCreate, ItemDelete, ItemUpdate

from .resolvers import (
    resolve_item,
    resolve_items,
)

from .types import Item


class UploadQueries(graphene.ObjectType):
    item = graphene.Field(
        Item,
        id=graphene.Argument(
            graphene.ID, required=True, description="ID of the upload item."
        ),
        description="Look up a upload item by ID.",
    )
    items = FilterInputConnectionField(
        Item,
        description="List of items.",
    )

    @staticmethod
    def resolve_items(_, info, **_kwargs):
        return resolve_items(info)

    @staticmethod
    def resolve_item(_, info, **data):
        return resolve_item(info, data["id"])


class UploadMutations(graphene.ObjectType):
    item_create = ItemCreate.Field()
    item_delete = ItemDelete.Field()
    item_update = ItemUpdate.Field()

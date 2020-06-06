import graphene
from graphql_jwt.exceptions import PermissionDenied

from ...userupload import models
from .types import Item

def resolve_items(info):
    return models.Item.objects.all()


def resolve_item(info, item_id):
    return graphene.Node.get_node_from_global_id(info, item_id, Item)
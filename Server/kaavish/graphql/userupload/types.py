import graphene
import graphene_django_optimizer as gql_optimizer

from ...userupload import models
from ..core.connection import CountableDjangoObjectType


class Item(CountableDjangoObjectType):

    class Meta:
        description = "Item/userupload."
        model = models.Item
        interfaces = [graphene.relay.Node]
        only_fields = [ # These are all the fields from the corresponding model
            "name",
            "url",
            "updated_at",
            "image",
        ]
from django.conf.urls import url

from . import views

urlpatterns = [
    url(
        r"^(?P<slug>[a-z0-9-_]+?)-(?P<upload_id>[0-9]+)/$",
        views.product_details,
        name="details",
    )
]

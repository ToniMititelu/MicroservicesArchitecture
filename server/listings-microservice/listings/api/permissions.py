from rest_framework.permissions import BasePermission, SAFE_METHODS

from api.utils import verify_token


import logging
logger = logging.getLogger()


class HasValidToken(BasePermission):
    def has_permission(self, request, view):
        # if request.method in SAFE_METHODS:
        #     return True
        return verify_token(request.META.get('HTTP_AUTHORIZATION')) is not None


class TestPermission(BasePermission):
    def has_permission(self, request, view):

        return False

from rest_framework.permissions import BasePermission


class IsSuperUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    message = "You are not superuser"

    def has_object_permission(self, request, view, obj):
        return request.user.is_superuser


class IsLawyer(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user.is_lawyer and request.user.is_authenticated)

from rest_framework.permissions import BasePermission


class IsNormal(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user.is_normal and request.user.is_authenticated)


class IsOwner(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user.is_normal and request.user.is_authenticated)

    message = "Bu sorunun sahibi siz olmalısınız"

    def has_object_permission(self, request, view, obj):
        return (obj.user == request.user.normaluser) or request.user.is_superuser


class AnswerIsOwner(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user.is_lawyer and request.user.is_authenticated)

    message = "Bu cevabın sahibi siz olmalısınız"

    def has_object_permission(self, request, view, obj):
        return (obj.user == request.user.lawyeruser) or request.user.is_superuser

from rest_framework.permissions import BasePermission


class IsLawyer(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user.is_lawyer and request.user.is_authenticated)


class IsOwner(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user.is_lawyer and request.user.is_authenticated)

    message = "Bu makelenin sahibi siz olmalısınız"

    def has_object_permission(self, request, view, obj):
        # print(obj) --> Article
        # print(obj.user) --> LawyerUser
        # print(request.user) --> CustomUser
        return (obj.user == request.user.lawyeruser) or request.user.is_superuser


class CommentIsOwner(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    message = "Bu yorumun sahibi siz olmalısınız"

    def has_object_permission(self, request, view, obj):
        return (obj.user == request.user) or request.user.is_superuser

from ninja import Router
from typing import List
from django.shortcuts import get_object_or_404
from ..schemas import PlatformOut
from ..models import Platform

router = Router()

@router.get("/", response=List[PlatformOut], auth=None)
def get_platforms(request):
    platforms = Platform.objects.all()
    return platforms

@router.get("/{platform_id}/", response=PlatformOut, auth=None)
def get_platform(request, platform_id: int):
    platform = get_object_or_404(Platform, id=platform_id)
    return platform

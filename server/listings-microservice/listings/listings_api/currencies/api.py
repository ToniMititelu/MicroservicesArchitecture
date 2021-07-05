from ninja import Router
from typing import List
from django.shortcuts import get_object_or_404
from ..schemas import CurrencyOut
from ..models import Currency

router = Router()


@router.get("/", response=List[CurrencyOut], auth=None)
def get_currencies(request):
    currencies = Currency.objects.all()
    return currencies


@router.get("/{currency_id}/", response=CurrencyOut, auth=None)
def get_currency(request, currency_id: int):
    currency = get_object_or_404(Currency, id=currency_id)
    return currency

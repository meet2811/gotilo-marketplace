from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('email', 'username', 'wallet_balance', 'is_staff', 'is_active')
    fieldsets = UserAdmin.fieldsets + (
        ('Marketplace Wallet', {'fields': ('wallet_balance',)}),
    )
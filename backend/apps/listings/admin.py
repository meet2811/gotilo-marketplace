from django.contrib import admin
from .models import GameCategory, AccountListing

@admin.register(GameCategory)
class GameCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(AccountListing)
class AccountListingAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'seller', 'category', 'price', 'is_sold', 'created_at')
    list_filter = ('category', 'is_sold', 'created_at')
    search_fields = ('title', 'description', 'seller__email')
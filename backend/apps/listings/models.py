from django.db import models
from django.conf import settings

class GameCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name_plural = 'Game Categories'

    def __str__(self):
        return self.name

class AccountListing(models.Model):
    seller = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='listings'
    )
    category = models.ForeignKey(
        GameCategory,
        on_delete=models.CASCADE,
        related_name='listings'
    )
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    # Media uploads
    image = models.ImageField(upload_to='listings/images/', blank=True, null=True)
    video = models.FileField(upload_to='listings/videos/', blank=True, null=True)

    # Sensitive credentials (hidden from public responses)
    account_credentials = models.TextField(help_text="Login credentials for the buyer")

    is_sold = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - ${self.price}"
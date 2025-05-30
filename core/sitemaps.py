from django.contrib.sitemaps import Sitemap
from django.urls import reverse

class StaticViewSitemap(Sitemap):
    priority = 0.5
    changefreq = 'weekly'  # Change to weekly for more frequent updates
    protocol = 'https'     # Explicitly set protocol
    
    def items(self):
        return ['home', 'about', 'contact', 'products', 'vision']

    def location(self, item):
        return reverse(item)
        
    def lastmod(self, obj):
        # Add last modification date if you can track it
        return None

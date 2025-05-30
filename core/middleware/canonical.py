from django.http import HttpResponsePermanentRedirect

class CanonicalDomainMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path.startswith('/admin/'):
            return self.get_response(request)

        canonical_url = f"https://foitechnologies.com{request.path}"
        if request.build_absolute_uri() != canonical_url:
            return HttpResponsePermanentRedirect(canonical_url)

        return self.get_response(request)
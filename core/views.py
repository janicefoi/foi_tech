from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.contrib import messages
from django.core.mail import EmailMessage

def home(request):
    features = [
        {
            'icon': '🧩',
            'title': 'Tailored SaaS Solutions',
            'description': 'We build platforms that address real-world problems — not one-size-fits-all software.'
        },
        {
            'icon': '📈 ',
            'title': 'Outcome-Driven Delivery',
            'description': 'Our focus isn’t just speed — it’s delivering tangible business results quickly and continuously.'
        },
        {
            'icon': '🛡️',
            'title': 'Secure by Design',
            'description': 'Data privacy, compliance, and cybersecurity are built into every system.'
        },
        {
            'icon': '🤖',
            'title': 'AI-Powered Automation',
            'description': 'We embed machine learning and automation into your workflows to eliminate friction.'
        },
        {
            'icon': '🌐',
            'title': 'Cloud-Native Architecture',
            'description': 'Scalable, always-on platforms optimized for speed and reliability.'
        },
        {
            'icon': '🫱🏾‍🫲🏼',
            'title': 'Collaborative Approach',
            'description': 'We work closely with our clients as long-term innovation partners — not just vendors.'
        },
    ]
    return render(request, 'core/home.html', {'features': features})

def about(request):
    principles = [
        {
            'icon': '💡',
            'title': 'Purpose-Driven',
            'description': 'Every product we build must create measurable business value.'
        },
        {
            'icon': '💼',
            'title': 'Customer-Centric',
            'description': 'We co-design with our users — understanding their workflows, needs, and goals.'
        },
        {

            'icon': '🧠',
            'title': 'Innovation-Led',
            'description': "We're not afraid to challenge the status quo with bold, creative ideas."
        },
        {
            'icon': '💻',
            'title': 'Tech for Good',
            'description': 'We believe technology should empower — not overwhelm or exclude.'
        },
    ]
    return render(request, 'core/about.html', {'principles': principles})

def products(request):
    return render(request, 'core/products.html')

def vision(request):
    return render(request, 'core/vision.html')


def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        company = request.POST.get('company')
        email = request.POST.get('email')  # Visitor's email
        message = request.POST.get('message')

        subject = f'New Contact Form Submission from {name} - {company}'
        email_message = f"""
        You received a new message from your website contact form.

        Name: {name}
        Company: {company}
        Email: {email}

        Message:
        {message}
        """

        try:
            email_obj = EmailMessage(
                subject=subject,
                body=email_message,
                from_email='contact@foitechnologies.com',  # ✅ Authenticated sender
                to=['contact@foitechnologies.com'],         # ✅ Sent to your inbox
                reply_to=[email],                           # ✅ Allows you to reply to the user
            )
            email_obj.send(fail_silently=False)
            messages.success(request, 'Your message has been sent successfully!')
            return redirect('contact')
        except Exception as e:
            messages.error(request, f'There was an error sending your message: {str(e)}')

    return render(request, 'core/contact.html')

from django.shortcuts import render

def main(request):
    return render(request, 'sorts/sorts.html')

def bubble(request):
    return render(request, 'bubble/bubble.html')
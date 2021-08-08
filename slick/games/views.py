from django.shortcuts import render


def main(request):
    return render(request, 'games/games.html')


def pair(request):
    return render(request, 'pair/pair.html')


def life(request):
    return render(request, 'life/life.html')
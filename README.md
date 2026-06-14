# MenuMaker - aplikacja dla restuaracji

Aplikacja webowa stworzona w ramach projektu studenckiego, która pozwala
restauratorom tworzyć własne menu online. Lokal może wybrać jeden z kilku
presetów wyglądu aplikacji, a następnie wygenerować kod QR do wydruku i
naklejenia na stoliku. Po zeskanowaniu kodu klient otwiera menu w wybranym
stylu.

## Funkcje

- tworzenie menu dla restauracji
- wybór jednego z gotowych presetów wyglądu
- generowanie kodu QR do danego menu
- wyświetlanie menu po zeskanowaniu kodu QR
- lokalna baza danych SQLite
- automatyczne seedowanie danych startowych

## Technologie

- Next.js
- Prisma 7
- SQLite
- TypeScript

## Wymagania

- Node.js (https://nodejs.org/) (zalecana wersja LTS)
- npm (instalowany razem z Node.js)

## Instalacja i uruchomienie

1. Pobierz folder z projektem z Moodle i wypakuj go na komputer.
2. Otwórz terminal w folderze głównym projektu.
3. Zainstaluj zależności:
   npm install
   npx prisma generate
   npx prisma migrate dev
   npx prisma db seed
   npm run dev

# Микрофронтенд: Сервис авторизации

## 📖 Общая информация
Микрофронтенд реализует систему аутентификации и авторизации с поддержкой современных практик безопасности.  
**Основные функции**:
- Многофакторная аутентификация (Email)
- Сессионное управление с JWT и refresh токенами
- Аутентификация с помощью Google, Github, Yandex, VK
- Восстановление и сброс пароля через Resend
- Интеграция с ролевой моделью
- Изолированная работа в Nx монорепозитории

**Особенности архитектуры**:
- Серверные компоненты Next.js для защищенных роутов
- Клиент-серверная валидация через Yup
- документация и тестирование UI через Storybook
- Полная type-safety с TypeScript

---

## 🛠 Стек технологий
### Frontend
- **Ядро**: Next.js 14 (App Router) + React 19
- **Аутентификация**: Auth.js (NextAuth) с адаптерами для Prisma
- **Стили**: Tailwind CSS
- **Валидация**: Yup
- **Утилиты**: uuid для генерации ID, Bcryptjs для хеширования

### Backend
- **ORM**: Prisma + PostgreSQL
- **Почтовый сервис**: Resend
- **Шифрование**: Node.js Crypto + Bcryptjs

### Инструменты
- **Монорепозиторий**: Nx workspace
- **Тестирование**: Jest + Testing Library + Storybook Interaction
- **Линтинг**: ESLint + Prettier TypeScript strict mode
- **Документация**: Storybook (документация компонентов)

---

## Паттерны реализации
1. **Стратегия аутентификации**:
   - Провайдеры Auth.js для OAuth (Google/GitHub)
   - Credentials-провайдер для email/password
2. **Валидация**:
   - Схемы Yup на клиенте
   - Серверная валидация через Yup в Server Actions
3. **Безопасность**:
   - Хранение сессий в HTTP-only cookies
   - Refresh Token Rotation через Auth.js
   - Шифрование чувствительных данных с Bcryptjs
4. **Состояние**:
   - Клиентский кэш через React 19 Actions

---

## 🔄 Процесс авторизации
TODO

## 🚀 Запуск проекта
1. Установите зависимости в Nx workspace:
```bash
npm install
```

2. Настройте окружение (`.env.local`):
```env
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

YANDEX_CLIENT_ID=...
YANDEX_CLIENT_SECRET=...

VK_CLIENT_ID=...
VK_CLIENT_SECRET=...
VK_DEVICE_ID=...

RESEND_API_KEY=re_...
AUTH_SECRET="your_crypto_secure_string"
```

3. Запустите в dev-режиме:
```bash
nx dev Auth
```
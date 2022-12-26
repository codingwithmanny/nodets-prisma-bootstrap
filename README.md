# NodeTS Prisma Bootstrap

This is a base NodeJS TypeScript Prisma App built with express and all
configurations files included.

This repository is meant to be a base to build on top of for building an API.

## Copy This App

```bash
git clone https://github.com/codingwithmanny/nodets-prisma-bootstrap myproject;
cd myproject;
rm -rf .git;
git init;
git remote add origin https://github.com/your/newrepo;
```

## Requirements

- NodeJS v18.12.1 or NVM

## Local Setup

While in project directory:

### Step 0 - (Optional) NVM Installation

```bash
# FROM ./

nvm install;
```

### Step 1 - Install Dependecies

```bash
# FROM ./

pnpm install; # npm install;
```

### Step 2 - Start Database

```bash
# FROM ./

docker compose up -d;
```

### Step 3 - Set Environment Variables

```bash
# FROM ./

cp .env.example .env;
```

### Step 4 - Run Migrations

```bash
# FROM ./

pnpm run db:migrate;
```

### Step 5 - Run Seeds

```bash
# FROM ./

pnpm run db:seed;
```

### Step 6 - Server Start

`Development:`

```bash
# FROM ./

pnpm dev; # npm dev;
```

`Production:`

```bash
# FROM ./

pnpm start; # npm start;
```

### Optional - Prisma Studio

```bash
# FROM ./

pnpm run db:studio;
```

### Additional - Tear Down Database

```bash
# FROM ./

docker compose down --remove-orphans -v;
```

## Production Commands

`Build`

```bash
# FROM ./

pnpm build; # npm run build
```

`Build & Serve`

```bash
# FROM ./

pnpm start; # npm start
```

## Tests

`All Tests`

```bash
# FROM ./

pnpm test; # npm run test;
```

`Jest Watch`

```bash
pnpm test:jest; # npm run test:jest;
```

`Jest Coverage`

```bash
pnpm test:coverage; # npm run test:coverage;
```

`Eslint`

```bash
pnpm test:lint; # npm run test:lint
```

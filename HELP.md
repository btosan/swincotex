npm install @prisma/adapter-pg pg

<!-- DEVELOPMENT -->

npx prisma format

npx prisma generate
# or (better for development):
npx prisma migrate dev --name add_project_date_default
npx prisma migrate dev --name init (for the first time)
# or (quick prototyping / no migrations):
npx prisma db push

<!-- PRODUCTION -->
npx prisma migrate dev --name add_project_date_default
npx prisma migrate dev --name baseline
npx prisma migrate deploy

npx prisma migrate resolve --applied 20260219_init

npx prisma migrate dev --name add-monitoring-enhancements


rm -rf package-lock.json .next

npx prisma migrate dev --name add-user-status-and-last-seen
npx prisma generate

<!-- ORDER OF PRISMA PRODUCTION MIGRATION AFTER UPDATING SCHEMA.PRISMA -->
# STEP 1:
npx prisma migrate dev --name add-monitoring-enhancements

# STEP 2:
git add prisma/migrations
git commit -m "Add monitoring enhancements"
git push

# STEP 3:
npx prisma migrate deploy

npx prisma db push

<!-- GENERATE NEXT_AUTH -->
openssl rand -base64 32
# You do it in bash

<!-- HOW TO GET APP DIRECTORY STRUCTURE & LAYOUT-->
# In your Next.js project root (bash )
find src/app -type d 2>/dev/null || find app -type d 2>/dev/null

<!-- FIND ALL THE FILES THAT HAVE "radix-ui\" -->
<!-- WINDOWS -->
findstr /r /s /l "from .radix-ui." src\components\ui\*.tsx

Or if you have VS Code, it's even easier — press Ctrl+Shift+F to open global search and type: from "radix-ui"


<!-- SHOW ALL -->
find . -not -path "*/node_modules/*" -not -path "*/.next/*" -not -path "*/.git/*" | sort > tree.txt



<!-- Hard refresh in browser: -->
Press Ctrl + Shift + R on http://abekuhotels.localhost:3000 — this forces the browser to bypass cache.




carefully mirror the GeneralBusiness pattern into Gym.tsx — CSS token helpers, adaptive hero overlay, no hardcoded strings, navbar scroll state, mobile menu, font imports, animation classes, and all pages following the same structural conventions.


npx prisma db seed


npx prisma db execute --file prisma/inspect-packages.sql --stdout

npx prisma db execute --file prisma/aiusage.sql

npx prisma db execute --file prisma/add-gov-institution-tables.sql

npx prisma db execute --file prisma/add-crud-tables.sql


<!-- RUn psql in vscode bash -->
psql -h localhost -U postgres -d swincotex

<!-- It will prompt for the password: -->

buchim7879
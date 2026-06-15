FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn prisma generate
RUN yarn build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && node -e \"const{PrismaClient}=require('@prisma/client');const p=new PrismaClient();p.threshold.upsert({where:{id:'singleton'},update:{},create:{id:'singleton',coldMax:22,hotMin:35}}).then(()=>console.log('Seeded')).catch(e=>{console.error(e);process.exit(1)}).finally(()=>p.\\$disconnect())\" && node server.js"]

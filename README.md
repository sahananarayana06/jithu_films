# Jithu Films — Wedding Photography & Cinematography

A responsive photography and cinematography portfolio built with React, Vite, TypeScript, Express, Drizzle ORM, MySQL and GSAP.

## Features

- Photography and cinematography portfolio
- Responsive homepage and interactive gallery
- Image lightbox and video previews
- Studio services and contact information
- Booking enquiry form
- Admin gallery management at `/admin`
- Local image uploads
- Database-backed booking enquiries and gallery management

## Requirements

- Node.js
- pnpm 10.18.0
- MySQL 8
- Environment variables configured in `.env`

## Installation and development

```bash
pnpm install
pnpm dev
```

The Express server and Vite development middleware run on the configured `PORT` or port 3000.

## Environment configuration

Configure these server-side environment variables:

```env
NODE_ENV=production
PORT=3002
DATABASE_URL=mysql://USERNAME:PASSWORD@127.0.0.1:3306/DATABASE_NAME

ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_strong_password
ADMIN_SESSION_SECRET=your_random_secret
```

Use strong, private credentials. Never commit `.env` or database passwords to GitHub.

## Database

The application uses MySQL and Drizzle ORM.

Run migrations with:

```bash
pnpm db:migrate
```

**Important:** Migration `0004_gigantic_xavin.sql` drops the `customer_reviews` table. Review this migration before applying it to any database containing data you need to preserve.

## Admin gallery

The gallery manager is available at:

```text
/admin
```

Configure `ADMIN_USERNAME`, `ADMIN_PASSWORD` (at least 12 characters), and `ADMIN_SESSION_SECRET` (at least 32 characters).

The admin interface supports:

- Adding gallery photos
- Editing photo information
- Replacing uploaded images
- Removing gallery photos
- Selecting homepage introduction photos

Gallery uploads are stored locally on the server. The default upload directory is `uploads/`, and uploaded images are served through `/uploads/`.

Set `GALLERY_UPLOAD_DIR` if you want to use a different upload directory.

## Booking enquiries

The booking form submits to:

```text
POST /api/enquiries
```

Enquiries are validated and stored in the `booking_enquiries` database table.

No email notification provider is currently configured. Successful submissions are saved to the database but do not automatically send email alerts.

## Studio configuration

Update:

```text
client/src/data/siteConfig.ts
```

Configure the studio's real:

- Email address
- WhatsApp URL
- Instagram URL
- Location
- Photography and film media

Replace sample contact information, demonstration footage and sample testimonials with approved studio content before publishing.

## Images and videos

Website images and videos are stored under:

```text
client/public/images/
```

The homepage background image is:

```text
client/public/images/Background.jpeg
```

Replace it with the studio's approved background image while retaining the filename, or update the corresponding reference in the source code.

Default gallery entries are configured in:

```text
shared/galleryPhotos.ts
```

## Useful commands

```bash
pnpm check
pnpm test
pnpm build
pnpm start
```

- `pnpm check` — TypeScript validation
- `pnpm test` — Run automated tests
- `pnpm build` — Build the production application
- `pnpm start` — Start the production server

## Project structure

```text
client/
  public/
  src/
    components/
    data/
    pages/

server/
  adminGallery.ts
  db.ts
  enquiries.ts
  gallery.ts
  storage.ts

drizzle/
  schema.ts/

shared/
  const.ts
  galleryPhotos.ts
```

## Deployment

The application can be deployed to a Linux VPS using Node.js, MySQL, PM2 and Nginx.

Keep production environment variables and uploaded images on the server. Source-code changes should be committed and pushed to GitHub, then deployed to the VPS.

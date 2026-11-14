# OneLink

OneLink is a clean, customizable link-in-bio platform built for sharing social profiles, projects, and other important links from one page. It is inspired by the simple link-in-bio experience popularized by Linktree, with a focused flow for creating and publishing a personal profile.

## Tech Stack

- **Next.js 16** with the App Router
- **React 19**
- **Tailwind CSS** for styling
- **MongoDB** for profile and link data
- **Turbopack** for local development and production builds
- **React Toastify** for form success and error messages

## Key Features

- Claim a custom handle from the home page.
- Add social links and other custom links with display text.
- Add a profile picture URL and short description.
- Prevent duplicate handles before saving a profile.
- Render public profiles at `/<handle>`.
- Use a responsive interface styled with Tailwind CSS.

## Project Structure

```text
app/
├── [handle]/page.js       # Public profile page backed by MongoDB
├── api/add/route.js       # POST endpoint for creating a profile
├── generate/page.js       # Profile creation form
├── layout.js              # Root layout, fonts, metadata, and navigation
├── page.js                # Home page and handle entry point
└── globals.css            # Global styles

components/
└── Navbar.js              # Shared navigation bar

lib/
└── mongodb.js             # Shared MongoDB client connection
```

## Getting Started Locally

### Prerequisites

- Node.js and npm
- A MongoDB deployment, either:
  - a local MongoDB server, or
  - a cloud MongoDB deployment such as MongoDB Atlas

### 1. Install dependencies

From the project root, run:

```bash
npm install
```

### 2. Configure MongoDB

Create a `.env.local` file in the project root:

```env
MONGODB_URI=mongodb://127.0.0.1:27017
```

Replace the value with your MongoDB Atlas connection string if you are using a cloud database.

OneLink uses the `onelink` database and stores profiles in the `links` collection.

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Main Routes

| Route | Purpose |
| --- | --- |
| `/` | Enter a handle and start creating a OneLink profile |
| `/generate?handle=your-handle` | Add profile details and links |
| `/[handle]` | View a published public profile |
| `/api/add` | Save a new profile with a `POST` request |

## Available Scripts

```bash
npm run dev    # Start the development server
npm run build  # Create a production build
npm run start  # Start the production server
npm run lint   # Run ESLint
```

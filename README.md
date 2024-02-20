# Water Monitor 🌊

## About The Project

Water Monitor is a cutting-edge platform designed to monitor water levels in various locations in real-time. By integrating data from external sensors and allowing for the addition of proprietary sensors, the project aims to offer comprehensive insights into water conditions to support sustainable water management practices.

## Technologies

- **NextJS**: Utilized for its server-side rendering capabilities, enhancing SEO and performance.
- **Tailwind**: Employs a utility-first approach to CSS, facilitating efficient styling.
- **TypeScript**: Ensures type safety and enhances the development experience by adding static typing to JavaScript.

## Environment Variables

To configure the project correctly, copy the `.env.example` file to `.env.local` and update it with the appropriate values:

- `NODE_RED_API`: For internal API calls (server-side).
- `API_USERNAME` & `API_PASSWORD`: Credentials for authenticating with the Node Red API using basic auth.
- `NEXT_PUBLIC_GRAFANA_URL`: The public URL for Grafana dashboards, integrated directly into the dashboard.
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: The API key used to show the Google Maps embeds; At least the following APIs need to be enabled: `Javascript API`, `Places`, `Geocoded`, `Maps`
- `NEXT_PUBLIC_VAPID_PUBLIC_KEY` & `VAPID_PRIVATE_KEY`: The API keys necessary to send and receive push notifications, execute `web-push generate-vapid-keys` to get valid keys. You will need to have `web-push` installed.
- `NEXT_PUBLIC_APPLICATION_URL`: This is the public application URL, necessary for non relative fetches

## Getting Started

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Visit `http://localhost:8080` to view the application. Deployment is managed through Vercel for optimal Next.js integration.

## Contributors

This project was brought to life thanks to the dedicated efforts of:

- Syan Delbart
- Jen Verboven
- Tristan Van Loy
- Wieland Vandebotermet
- Lucas De Greef
- Charles Kwakye

Their contributions range from initial development to sensor integration, UI/UX design, backend and API development, data visualization, and project deployment.

## Deployment

Vercel is used for deploying the application, ensuring a smooth, scalable deployment process tailored for Next.js applications.

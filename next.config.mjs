import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    scope: "/",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    // ... other config options
};

export default withPWA(nextConfig);

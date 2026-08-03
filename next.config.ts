import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(process.cwd()).replace(/\\/g, "/"),
  },
};

export default nextConfig;


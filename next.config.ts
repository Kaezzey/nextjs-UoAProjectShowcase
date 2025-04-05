import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    domains: ['opus.ing','image.aladin.co.kr', 'www.deviantart.com', 'w0.peakpx.com'],
  },


  experimental:{
    ppr: 'incremental'
  },
  devIndicators: {
    appIsrStatus: true,
    buildActivity: true,
    buildActivityPosition: 'bottom-left'
  },
};

export default nextConfig;



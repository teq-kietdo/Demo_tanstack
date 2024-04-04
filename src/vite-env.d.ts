/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_APP_BASE_URL: string;
    readonly VITE_APP_AUTH_URL: string;
    readonly VITE_APP_GENIUS_KEY: string;
    readonly VITE_APP_GENIUS_HOST: string;
    readonly VITE_APP_VIDEO_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
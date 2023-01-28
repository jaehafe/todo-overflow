/// <reference types="vite/client" />

export interface ImportMetaEnv {
  readonly VITE_BASE_URL: string | undefined;
  readonly VITE_API_KEY: string | undefined;
  readonly VITE_USERNAME: string | undefined;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/// <reference types="vite/client" />

declare module "*.json" {
  const value: Record<string, string>;
  export default value;
}

interface ImportMetaEnv {
  readonly VITE_ADMIN_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

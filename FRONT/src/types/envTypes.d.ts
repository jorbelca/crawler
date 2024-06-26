// TIPADO PARA LAS VARIABLES DE ENTORNO
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NODE_ENV: string;
  readonly VITE_API_URL_TEST: string;
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

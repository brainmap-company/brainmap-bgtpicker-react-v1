declare module 'file-saver' {
  export function saveAs(data: Blob | File, filename?: string, disableAutoBOM?: boolean): void;
}

declare module '@src/config/secret.json' {
  const value: {
    APP_NAME: string;
    CRYPTO: {
      STORAGE_KEY: string;
    };
    AUTO_LOGIN: {
      id: string;
      pwd: string;
    };
    REQUEST: Array<{
      url: string;
    }>;
  };
  export default value;
}








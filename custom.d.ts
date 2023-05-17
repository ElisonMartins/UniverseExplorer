interface Window {
    ethereum?: {
      request: (options: { method: string }) => Promise<string[]>;
      on: (eventName: string, callback: (accounts: string[]) => void) => void;
    };
  }
  
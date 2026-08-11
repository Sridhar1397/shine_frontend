import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import api from '../api/publicClient';

interface SiteConfig {
  branding: any;
  footer: any;
  contact: any;
  hero: any;
  sliders: any[];
  about: any;
  servicesBlock: any;
}

interface SiteConfigContextValue {
  config: SiteConfig | null;
  loading: boolean;
}

const SiteConfigContext = createContext<SiteConfigContextValue>({ config: null, loading: true });

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/site-config')
      .then((res) => setConfig(res.data.data))
      .catch(() => setConfig(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SiteConfigContext.Provider value={{ config, loading }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  return useContext(SiteConfigContext);
}

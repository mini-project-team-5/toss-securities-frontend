import { useSearchParams } from 'react-router-dom';

export const useTab = (defaultTab) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || defaultTab;

  const setTab = (tab) => {
    setSearchParams({ tab });
  };

  return { currentTab, setTab };
};

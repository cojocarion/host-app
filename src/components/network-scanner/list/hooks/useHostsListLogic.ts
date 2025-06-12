import { useMemo } from "react";

export const useHostsListLogic = (hosts: any[]) => {
  const activeHosts = useMemo(
    () => hosts.filter((host) => host.isActive),
    [hosts]
  );

  const inactiveHosts = useMemo(
    () => hosts.filter((host) => !host.isActive),
    [hosts]
  );

  return {
    activeHosts,
    inactiveHosts,
  };
};

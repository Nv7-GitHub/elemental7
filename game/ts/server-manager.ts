import { ElementalConfig } from "../../shared/elem";
import { addDLCByUrl } from "./dlc-fetch";
import { getConfigString, getInstalledServers, setConfigString } from "./savefile";

interface ServerEntry {
  baseUrl: string,
  name: string,
  config: ElementalConfig,
}

export const builtInOfficialServers = [
  'https://nv7haven.tk',
  'https://nv7haven.tk/anarchy',
  'https://nv7haven.tk/single',
];
export const builtInInternalServers = [
  // 'internal:singleplayer',
];
export const builtInDevInternalServers = [
  'internal:null',
  'internal:all-colors',
  'internal:stress-test-1k',
  'internal:stress-test-5k',
  'internal:stress-test-10k',
];
export const builtInThirdPartyServers = [
  //'https://elemental-reborn.tk',      // cannot suggest, need google auth
  // elemental reborn commented because it is down and request requires timeout, causing slow load times
];
export const allBuiltInServers = [
  ...builtInOfficialServers,
  ...builtInThirdPartyServers
];
export const serverOrder = [
  ...builtInInternalServers,
  ...builtInOfficialServers,
  ...builtInDevInternalServers,
  ...builtInThirdPartyServers,
];

export async function getServerList(): Promise<ServerEntry[]> {
  return await getInstalledServers() as ServerEntry[];
}
export async function installDefaultServers(): Promise<void> {
  const servers = await getInstalledServers() as ServerEntry[];
  const list = allBuiltInServers.filter(x => !servers.some(y => y.baseUrl === x) && x.startsWith('https://'));
  await Promise.all(list.map(x => {
    return addDLCByUrl(x, 'server', true);
  }));
}

export async function setActiveServer(baseUrl: string) {
  setConfigString('server', baseUrl);
}

export async function getActiveServer() {
  const name = getConfigString('server', allBuiltInServers[0]);
  return (await getServerList()).find(x => x.baseUrl === name) || { baseUrl: name, name: 'Unknown Server' }
}

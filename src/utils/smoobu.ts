export const suryaId = 1115674;
export const chandraId = 1115668;
export const jalaId = 1115671;
export const akashaId = 1574678;
export const lakshmiId = 1587920;

export type villaIdsType =
  | typeof suryaId
  | typeof chandraId
  | typeof jalaId
  | typeof akashaId
  | typeof lakshmiId;

export type VillaNamesType =
  | 'surya'
  | 'chandra'
  | 'jala'
  | 'akasha'
  | 'lakshmi';

export const villas = new Map<string, villaIdsType>([
  ['surya', suryaId],
  ['chandra', chandraId],
  ['jala', jalaId],
  ['akasha', akashaId],
  ['lakshmi', lakshmiId],
]);

// Create a reverse map for id to name mapping
export const villaIdsMap = new Map<villaIdsType, string>();
for (const [name, id] of villas) {
  villaIdsMap.set(id, name);
}

export const villaIdsArray: villaIdsType[] = Array.from(villaIdsMap.keys());

export function getVillaName(villaId: villaIdsType): VillaNamesType {
  return (villaIdsMap?.get(villaId) as VillaNamesType) ?? 'surya';
}

export function getVillaId(villaName: VillaNamesType): villaIdsType {
  return villas?.get(villaName) ?? suryaId;
}

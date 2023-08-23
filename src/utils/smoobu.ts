export const suryaId = 1115674;
export const chandraId = 1115668;
export const jalaId = 1115671;
export const akashaId = 1574678;
export const lakshmiId = 1587920;

export const villas = new Map<string, { id: number }>([
  ['surya', { id: 1115674 }],
  ['chandra', { id: 1115668 }],
  ['jala', { id: 1115671 }],
  ['akasha', { id: 1574678 }],
  ['lakshmi', { id: 1587920 }],
]);

// Turn the map above into a list of ids
export const villaIds = new Set([...villas].map(([, { id }]) => id));

export type villaIdsType =
  | typeof suryaId
  | typeof chandraId
  | typeof jalaId
  | typeof akashaId
  | typeof lakshmiId;

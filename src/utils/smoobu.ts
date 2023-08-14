export const villas = new Map<string, { id: number }>([
  ['surya', { id: 1115674 }],
  ['chandra', { id: 1115668 }],
  ['jala', { id: 1115671 }],
  ['akasha', { id: 1574678 }],
  ['lakshmi', { id: 1587920 }],
]);

export type VillaName = keyof typeof villas;
export type VillaId = (typeof villas)[VillaName];

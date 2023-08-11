// export const activeVillaIds = () => {
//   const suryaId: number = parseInt(
//     process.env.NEXT_PUBLIC_SMOOBU_SURYA_ID ?? '0'
//   );
//   const chandraId: number = parseInt(
//     process.env.NEXT_PUBLIC_SMOOBU_CHANDRA_ID ?? '0'
//   );
//   const jalaId: number = parseInt(
//     process.env.NEXT_PUBLIC_SMOOBU_JALA_ID ?? '0'
//   );
//   const akashaId: number = parseInt(
//     process.env.NEXT_PUBLIC_SMOOBU_AKASHA_ID ?? '0'
//   );
//   const lakshmiId: number  parseInt(
//     process.env.NEXT_PUBLIC_SMOOBU_LAKSHMI_ID ?? '0'
//   );
//   return {
//     surya: suryaId,
//     chandra: chandraId,
//     jala: jalaId,
//     akasha: akashaId,
//     laskshmi: lakshmiId,
//   } as const;
// };

export const villas = {
  surya: parseInt(process.env.NEXT_PUBLIC_SMOOBU_SURYA_ID ?? '0'),
  chandra: parseInt(process.env.NEXT_PUBLIC_SMOOBU_CHANDRA_ID ?? '0'),
  jala: parseInt(process.env.NEXT_PUBLIC_SMOOBU_JALA_ID ?? '0'),
  akasha: parseInt(process.env.NEXT_PUBLIC_SMOOBU_AKASHA_ID ?? '0'),
  lakshmi: parseInt(process.env.NEXT_PUBLIC_SMOOBU_LAKSHMI_ID ?? '0'),
} as const;

export type VillaName = keyof typeof villas;
export type VillaId = (typeof villas)[VillaName];

export type ChannelNameType = keyof typeof channelIds;
export type ChannelIdType = (typeof channelIds)[ChannelNameType];

export const channelIds = {
  booking: 1466473,
  airbnb: 1466470,
  agoda: 1556329,
  blocked: 1466458,
  website: 1466467,
  direct: 1466464,
};

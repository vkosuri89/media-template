/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

export const mediaList = [
  {
    id: "0",
    thumbnailImage:
      "https://by3302files.storage.live.com/y4mohyKkLvuC6HfaeJbCtX1gnRdCHlLpJe1n6L4OLkd4z9ljbC_w-vcL0RJjs0k5IJvVY3AcJ1O0wmfG_Bwzs7CUCwqTTwuPNej7MiIbXqQDySexIq_qRUVK7v68bA4glUS6UBn-lmZBfiWI51h63-tZvhwtso6_55F1xjvo6z02v-K5yp56mTi0LsWPLblOPxL?width=660&height=371&cropmode=none",
    title: "Teams Channel Trailer",
    src: "https://filesamples.com/samples/video/mp4/sample_1280x720_surfing_with_audio.mp4",
    type: "audio",
  },
];



export const searchList = [
  {
      "id": 0,
      "songId": "2Fxmhks0bxGSBdJ92vM42m",
      "thumbnailImage": "https://i.scdn.co/image/ab67616d0000b27350a3147b4edd7701a876c6ce",
      "title": "bad guy"
  },
  {
      "id": 1,
      "songId": "0xzI1KAr0Yd9tv8jlIk3sn",
      "thumbnailImage": "https://i.scdn.co/image/ab67616d0000b2738c47a33a55c6d23cc9d2cf3f",
      "title": "Bad Decisions (with BTS & Snoop Dogg)"
  },
  {
      "id": 2,
      "songId": "64p6ua7zpf66s62StC2QLv",
      "thumbnailImage": "https://i.scdn.co/image/ab67616d0000b2739b93b7071e8f0d9e14aa5d1c",
      "title": "Bad Boy (feat. Luana Kiara)"
  },
  {
      "id": 3,
      "songId": "2TzyJEUfWHGRsk3r6Emvbk",
      "thumbnailImage": "https://i.scdn.co/image/ab67616d0000b273375bf11209444fdd2099be86",
      "title": "Daru Badnaam"
  },
  {
      "id": 4,
      "songId": "2RSHsoi04658QL5xgQVov3",
      "thumbnailImage": "https://i.scdn.co/image/ab67616d0000b273da6f73a25f4c79d0e6b4a8bd",
      "title": "Bad Liar"
  },
  {
      "id": 5,
      "songId": "2NTVtNcpC0i1R7LVGaCZCF",
      "thumbnailImage": "https://i.scdn.co/image/ab67616d0000b273efe374ffabeb543840dee228",
      "title": "Jugnu"
  },
  {
      "id": 6,
      "songId": "4p1yzpajuKXwZKBQ7PyH9x",
      "thumbnailImage": "https://i.scdn.co/image/ab67616d0000b273efe1737aeb91b2167738c095",
      "title": "Bad"
  },
  {
      "id": 7,
      "songId": "2VrSkfinwUSNc7uAXiL0FA",
      "thumbnailImage": "https://i.scdn.co/image/ab67616d0000b2731226810d40e37677f6f58384",
      "title": "Let Me Down Slowly / Mai Dhoondhne Ko Zamaney / Kabhi Jo Badal Barsey (Medley)"
  },
  {
      "id": 8,
      "songId": "5WzfGg2ueNoOS5aIkaR9qX",
      "thumbnailImage": "https://i.scdn.co/image/ab67616d0000b273dc53a10529383dc097601a49",
      "title": "Atak Gaya - Arijit Singh"
  },
  {
      "id": 9,
      "songId": "0g0fOWwiRrcTnAPFHkvP4e",
      "thumbnailImage": "https://i.scdn.co/image/ab67616d0000b273b1f6c959559c992620608196",
      "title": "Bad Habits"
  }
];

function getInitialMediaId() {
  const url = new URL(window.location);
  const params = url.searchParams;
  return params.get("mediaId");
}

export function getInitialMediaItem() {
  const mediaId = getInitialMediaId();
  const mediaItem = mediaList.find(
    (mediaItem) => `${mediaItem.id}` === mediaId
  );
  return mediaItem ? mediaItem : mediaList[0];
}

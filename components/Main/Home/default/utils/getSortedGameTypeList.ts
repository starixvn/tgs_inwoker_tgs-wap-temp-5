import { GameTypeEnum } from "@/api-services/utils/Enum";
import config from "@/config/config";
import Common from "@/utils/Common";
import HomePageGame from "@/models/homePageGame";

const sortingHK28 = [
  GameTypeEnum.LIVELOBBY,
  GameTypeEnum.SPORTS,
  GameTypeEnum.ESPORTS,
  GameTypeEnum.QIPAILOBBY,
  GameTypeEnum.SLOT,
  GameTypeEnum.FISH,
  GameTypeEnum.TABLEGAME,
  GameTypeEnum.LOTTERYLOBBY,
];

const sortingSKY = [
  GameTypeEnum.LIVELOBBY,
  GameTypeEnum.QIPAILOBBY,
  GameTypeEnum.SPORTS,
  GameTypeEnum.FISH,
  GameTypeEnum.SLOT,
  GameTypeEnum.TABLEGAME,
  GameTypeEnum.ESPORTS,
  GameTypeEnum.LOTTERYLOBBY,
];

const sortingPB = [
  GameTypeEnum.SLOT,
  GameTypeEnum.LIVELOBBY,
  GameTypeEnum.SPORTS,
  GameTypeEnum.ESPORTS,
  GameTypeEnum.TABLEGAME,
  GameTypeEnum.FISH,
  GameTypeEnum.LOTTERYLOBBY,
  GameTypeEnum.QIPAILOBBY,
];

const sortingWLGHK = [
  GameTypeEnum.LIVELOBBY,
  GameTypeEnum.QIPAILOBBY,
  GameTypeEnum.SPORTS,
  GameTypeEnum.ESPORTS,
  GameTypeEnum.FISH,
  GameTypeEnum.LOTTERYLOBBY,
  GameTypeEnum.SLOT,
  GameTypeEnum.TABLEGAME,
];

const sortingGMO = [
  GameTypeEnum.LIVELOBBY,
  GameTypeEnum.QIPAILOBBY,
  GameTypeEnum.TABLEGAME,
  GameTypeEnum.FISH,
  GameTypeEnum.SPORTS,
  GameTypeEnum.LOTTERYLOBBY,
  GameTypeEnum.ESPORTS,
  GameTypeEnum.SLOT,
];

const sortingPB3 = [
  GameTypeEnum.SLOT,
  GameTypeEnum.LIVELOBBY,
  GameTypeEnum.SPORTS,
  GameTypeEnum.RNGSPORTS,
  GameTypeEnum.TABLEGAME,
  GameTypeEnum.FISH,
  GameTypeEnum.ESPORTS,
  GameTypeEnum.QIPAILOBBY,
  GameTypeEnum.LOTTERYLOBBY,
];

const sortingBUNNY = [
  GameTypeEnum.LIVELOBBY,
  GameTypeEnum.QIPAILOBBY,
  GameTypeEnum.SPORTS,
  GameTypeEnum.ESPORTS,
  GameTypeEnum.LOTTERYLOBBY,
  GameTypeEnum.SLOT,
  GameTypeEnum.TABLEGAME,
  GameTypeEnum.FISH,
];

function getSortedGameTypeList(gameTypeList: number[]): number[] {
  const result = gameTypeList.sort((a, b) => {
    if (config.features.MenuItem_Sorting_WLGHK)
      return sortingWLGHK.indexOf(a) - sortingWLGHK.indexOf(b);
    else if (config.features.MenuItem_Sorting_HK28)
      return sortingHK28.indexOf(a) - sortingHK28.indexOf(b);
    else if (config.features.MenuItem_Sorting_SKY)
      return sortingSKY.indexOf(a) - sortingSKY.indexOf(b);
    else if (config.features.MenuItem_Sorting_PB)
      return sortingPB.indexOf(a) - sortingPB.indexOf(b);
    else if (config.features.MenuItem_Sorting_GMO)
      return sortingGMO.indexOf(a) - sortingGMO.indexOf(b);
    else return a - b;
  });
  return result;
}

const cockfightBrandList = ["SM01", "AWC_COCKFIGHT"];

export function getSortedGameList(gameList: HomePageGame[]) {
  let currentType = -1;
  const gameTypeListSorting: number[] = [];
  const displayGameType = Common.GetDisplayGameType();

  gameList
    .filter((a) => {
      return displayGameType.indexOf(a.type) >= 0;
    })
    .filter((b) => {
      return b.type !== GameTypeEnum.RNGSPORTS;
    })
    .sort((a, b) => {
      return a.type - b.type;
    })
    .forEach((row, index) => {
      let rowType = row.type;
      if (cockfightBrandList.includes(row.game_platform_name)) {
        rowType = GameTypeEnum.COCKFIGHT;
      }
      if (currentType !== rowType) {
        gameTypeListSorting.push(rowType);
      }
      currentType = rowType;
    });

  return getSortedGameTypeList(gameTypeListSorting);
}

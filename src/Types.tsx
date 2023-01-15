export type GoatConfigType = {
  userType: 'student' | 'staff';
  preferredLot: string;
  favorites: string[];
  firstOpen: boolean;
};

export type LotData = {
  spaces: number;
  name: string;
};

export type RefreshLotPromiseFunction = () => Promise<LotData[]>;
export type RefreshLotDataFunction = () => void;
export type FlipFavorite = (name: string) => void;

export type LotObject = {
  spaces: number;
  isFavorite: boolean;
  name: string;
};

export type LotProps = {
  spaces: number;
  isFavorite: boolean;
  name: string;
  flipFavorite: FlipFavorite;
};


export type FirstRunProps = {
  goHome: () => void;
  lots: LotObject[];
};

export type HomeProps = {
  flipFavorite: FlipFavorite;
  lots: LotObject[];
  refresh: () => void;
};

export type LotListProps = {
  flipFavorite: FlipFavorite;
  lots: LotObject[];
};

export type AccountProps = {
  config: GoatConfigType;
  setStateConfig: (newConfig: GoatConfigType) => void;
  lots: LotObject[];
}
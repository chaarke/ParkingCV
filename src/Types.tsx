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

export type LotProps = {
  spaces: number;
  isFavorite: boolean;
  name: string;
};

export type LotPropsReal = {
  spaces: number;
  isFavorite: boolean;
  name: string;
  flipFavorite: FlipFavorite;
};


export type FirstRunProps = {
  goHome: () => void;
  lots: LotProps[];
};

export type HomeProps = {
  flipFavorite: FlipFavorite;
  lots: LotProps[];
  refresh: () => void;
};

export type LotListProps = {
  flipFavorite: FlipFavorite;
  lots: LotProps[];
};
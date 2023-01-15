import { SetStateAction } from "react";

export type Pages = 'home' | 'loading' | 'account' | 'lot' | 'profile' | 'driving' | 'first_run' | 'error';
export type LotTypes = 'Commuter' | 'Residential' | 'Employee' | 'Visitor';

export type GoatConfigType = {
  userType: 'student' | 'staff';
  commuterType: 'commuter' | 'residential';
  isVisitor: boolean;
  favorites: string[];
  firstOpen: boolean;
};

export type LotData = {
  spaces: number;
  name: string;
  type: LotTypes[];
};

export type RefreshLotPromiseFunction = () => Promise<LotData[]>;
export type RefreshLotDataFunction = () => void;
export type FlipFavorite = (name: string) => void;
export type SetPage = (value: SetStateAction<Pages>) => void;
export type SetAcknowledged = (value: SetStateAction<boolean>) => void;
export type SetStateConfig = (value: SetStateAction<GoatConfigType>) => void;

export type LotObject = {
  spaces: number;
  isFavorite: boolean;
  name: string;
  type: LotTypes[];
};

export type LotProps = {
  spaces: number;
  isFavorite: boolean;
  name: string;
  flipFavorite: FlipFavorite;
};


export type FirstRunProps = {
  setStateConfig: SetStateConfig;
  goHome: () => void;
  refreshLotData: RefreshLotDataFunction;
};

export type HomeProps = {
  flipFavorite: FlipFavorite;
  lots: LotObject[];
  refresh: () => void;
  page: Pages;
  setPage: SetPage;
  acknowledged: boolean;
  setAcknowledged: SetAcknowledged;
};

export type LotListProps = {
  flipFavorite: FlipFavorite;
  lots: LotObject[];
  refresh: () => void;
};

export type AccountProps = {
  page: Pages;
  setPage: SetPage;
  config: GoatConfigType;
  setStateConfig: (newConfig: GoatConfigType) => void;
}

export type AppBarProps = {
  page: Pages;
  bottom: number;
  setPage: SetPage;
};

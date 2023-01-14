export type GoatConfigType = {
  userType: 'student' | 'staff';
  preferredLot: string;
  favorites: string[];
  firstOpen: boolean;
};

export type LotProps = {
  spaces: number;
  isFavorite: boolean;
  name: string;
};

export type FirstRunProps = {
  goHome: () => void;
  lots: LotProps[] | null;
};
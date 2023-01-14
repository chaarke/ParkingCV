import React, { useEffect, useState } from "react";
import HomePage from "./Home";
import LoadingPage from "./Loading";
import AccountPage from "./Account";
import LotPage from "./Lot";
import DrivingPage from "./Driving";
import FirstRunPage from "./FirstRun";
import ErrorPage from "./ErrorPage";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Pages = 'home' | 'loading' | 'account' | 'lot' | 'profile' | 'driving' | 'first_run';

export type GoatConfigType = {
  usertype: 'student' | 'staff';
  preferred_lot: string;
  favorites: string[];
  first_open: boolean;
};

function ProfilePage() {
  return null;
}

function App(): JSX.Element {
  const [page, setPage] = useState<Pages>('loading');
  const [config, setStateConfig] = useState<GoatConfigType | {}>({});

  useEffect(() => {
    AsyncStorage.getItem('config').then(r => {
      if (r !== null) {
        setStateConfig(JSON.parse(r));
        setPage('home');
      } else {
        /* No config is set. Request the first run page. */
        setStateConfig({
          usertype: 'student',
          preferred_lot: '',
          favorites: [],
          first_open: true,
        });
        setPage('first_run');
      }
    });
  }, []);

  switch (page) {
    case 'loading':
      return <LoadingPage/>
    case 'home':
      return <HomePage/>
    case 'account':
      return <AccountPage/>
    case 'lot':
      return <LotPage/>
    case 'profile':
      return <ProfilePage/>
    case 'driving':
      return <DrivingPage/>
    case 'first_run':
      return <FirstRunPage/>
    default:
      return <ErrorPage/>
  }
}

export default App;


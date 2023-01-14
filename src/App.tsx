import React, { useEffect, useState } from "react";
import HomePage from "./Home";
import LoadingPage from "./Loading";
import AccountPage from "./Account";
import LotPage from "./Lot";
import DrivingPage from "./Driving";
import FirstRunPage from "./FirstRun";
import ErrorPage from "./ErrorPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoatConfigType } from "./Types";

type Pages = 'home' | 'loading' | 'account' | 'lot' | 'profile' | 'driving' | 'first_run';

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
          userType: 'student',
          preferredLot: '',
          favorites: [],
          firstOpen: true,
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
      return <FirstRunPage goHome={() => setPage('home')} lots={null}/>
    default:
      return <ErrorPage/>
  }
}

export default App;


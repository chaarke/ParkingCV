/**
 * @format
 */

import React, {useState} from 'react';
import { getGoatConfig, GoatConfigType } from "./Config";
import HomePage from "./Home";
import LoadingPage from "./Loading";
import AccountPage from "./Account";
import LotPage from "./Lot";
import DrivingPage from "./Driving";
import FirstRunPage from "./FirstRun";
import ErrorPage from "./ErrorPage";

type Pages = 'home' | 'loading' | 'account' | 'lot' | 'profile' | 'driving' | 'first_run';

function ProfilePage() {
  return null;
}

function App(): JSX.Element {
  const [page, setPage] = useState<Pages>('loading');
  const [config, setStateConfig] = useState<GoatConfigType | {}>({});

  getGoatConfig().then(r => {
    setStateConfig(r);
    setPage('home');
  });

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


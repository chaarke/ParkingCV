import React, { useEffect, useState } from "react";
import HomePage from "./Home";
import LoadingPage from "./Loading";
import AccountPage from "./Account";
import LotPage from "./Lot";
import DrivingPage from "./Driving";
import FirstRunPage from "./FirstRun";
import ErrorPage from "./ErrorPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FlipFavorite,
  GoatConfigType,
  LotData,
  LotProps,
  RefreshLotDataFunction,
  RefreshLotPromiseFunction
} from "./Types";
import { SafeAreaProvider } from "react-native-safe-area-context";

type Pages = 'home' | 'loading' | 'account' | 'lot' | 'profile' | 'driving' | 'first_run' | 'error';

function App(): JSX.Element {
  const [page, setPage] = useState<Pages>('loading');
  const [config, setStateConfig] = useState<GoatConfigType>({
    userType: 'student',
    preferredLot: '',
    favorites: [],
    firstOpen: true,
  });
  const [lotData, setLotData] = useState<LotProps[]>([]);

  const refreshPromise: RefreshLotPromiseFunction = () => {
    return fetch('')
      .then(r => r.json())
      .then(data => JSON.parse(data))
      .catch(error => {
        /* Use fake data */
        const lot: LotData = {spaces: 10, name: 'West'};
        const lot2: LotData = {spaces: 3, name: 'Library'};
        const lot3: LotData = {spaces: 5, name: 'Hackfeld'};
        return [lot, lot2, lot3];
      });
  };

  const refreshLotData: RefreshLotDataFunction = () => {
    refreshPromise()
      .then(r =>
        setLotData(r.map(lot => {
          return Object.assign({}, lot,
            {isFavorite: config.favorites.includes(lot.name)});
        }))
      );
  };

  const flipFavorite: FlipFavorite = (name: string) => {
    let newFavorite;
    const newLots = lotData.map(lot => {
      if (lot.name === name) {
        newFavorite = !lot.isFavorite;
        lot.isFavorite = newFavorite;
        return lot;
      } else {
        return lot;
      }
    });
    setLotData(newLots);

    const newConfig = {...config};
    if (newFavorite) {
      // Add the name to the favorites list
      newConfig.favorites.push(name);
    } else {
      // Remove from the favorites list
      newConfig.favorites = newConfig.favorites.filter(n => n !== name);
    }
    setStateConfig(newConfig);
    AsyncStorage.setItem('config', JSON.stringify(newConfig));
  };

  useEffect(() => {
    Promise.all([
      refreshPromise(),
      AsyncStorage.getItem('config')
    ])
      .then(values => {
        if (values[1] !== null) {
          const newConfig = JSON.parse(values[1]);
          setStateConfig(newConfig);
          setLotData(values[0].map(lot => {
            return Object.assign({}, lot,
              {isFavorite: newConfig.favorites.includes(lot.name)});
          }));
          setPage('home');
        } else {
          /* No config is set. Request the first run page. */
          setLotData(values[0].map(lot => {
            return Object.assign({}, lot, {isFavorite: false});
          }));
          setPage('first_run');
        }
      })
      .catch(error => {
        console.error(error);
        setPage('error');
      });
  }, []);

  switch (page) {
    case 'loading':
      return <LoadingPage />
    case 'home':
      return (
        <SafeAreaProvider>
          <HomePage flipFavorite={flipFavorite} lots={lotData} refresh={refreshLotData} />
        </SafeAreaProvider>
      )
    case 'account':
      return <AccountPage />
    case 'lot':
      return <LotPage/>
    case 'driving':
      return <DrivingPage />
    case 'first_run':
      return <FirstRunPage goHome={() => setPage('home')} lots={lotData}/>
    case 'error':
    default:
      return <ErrorPage />
  }
}

export default App;


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
  LotObject, Pages,
  RefreshLotDataFunction,
  RefreshLotPromiseFunction
} from "./Types";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

function App(): JSX.Element {
  const [page, setPage] = useState<Pages>('loading');
  const [config, setStateConfig] = useState<GoatConfigType>({
    userType: 'student',
    commuterType: 'commuter',
    isVisitor: false,
    favorites: [],
    firstOpen: true,
  });
  const [lotData, setLotData] = useState<LotObject[]>([]);
  const [acknowledged, setAcknowledged] = useState<boolean>(false);

  const refreshPromise: RefreshLotPromiseFunction = () => {
    return fetch('http://130.215.168.43:5000/lots')
      .then(r => r.json())
      .catch(error => {
        /* Use fake data */
        const lot: LotData = { spaces: 10, name: 'West' , types: ['Commuter']};
        const lot2: LotData = { spaces: 3, name: 'Library' , types: ['Visitor']};
        const lot3: LotData = { spaces: 5, name: 'Hackfeld' , types: ['Residential', 'Employee']};
        return [lot, lot2, lot3];
      });
  };

  const refreshLotData: RefreshLotDataFunction = () => {
    refreshPromise()
      .then(r => {
          const filteredLots = r.filter(lot => {
            if (config.isVisitor && lot.types.includes('Visitor')) {
              return true;
            }
            if (config.userType === 'student' && lot.types.includes('Employee')) {
              return false;
            }
            return (config.commuterType === 'residential' && lot.types.includes('Residential'));
          });
          setLotData(filteredLots.map(lot => {
            return Object.assign({}, lot,
              { isFavorite: config.favorites.includes(lot.name) });
          }));
      });
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

    const newConfig = { ...config };
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

  const theme = {
    ...DefaultTheme,
    colors: {
      "primary": "rgb(154, 64, 87)",
      "onPrimary": "rgb(255, 255, 255)",
      "primaryContainer": "rgb(255, 217, 223)",
      "onPrimaryContainer": "rgb(63, 0, 22)",
      "secondary": "rgb(117, 86, 92)",
      "onSecondary": "rgb(255, 255, 255)",
      "secondaryContainer": "rgb(255, 217, 223)",
      "onSecondaryContainer": "rgb(43, 21, 26)",
      "tertiary": "rgb(122, 87, 50)",
      "onTertiary": "rgb(255, 255, 255)",
      "tertiaryContainer": "rgb(255, 220, 188)",
      "onTertiaryContainer": "rgb(44, 23, 0)",
      "error": "rgb(186, 26, 26)",
      "onError": "rgb(255, 255, 255)",
      "errorContainer": "rgb(255, 218, 214)",
      "onErrorContainer": "rgb(65, 0, 2)",
      "background": "rgb(255, 251, 255)",
      "onBackground": "rgb(32, 26, 27)",
      "surface": "rgb(255, 251, 255)",
      "onSurface": "rgb(32, 26, 27)",
      "surfaceVariant": "rgb(243, 221, 224)",
      "onSurfaceVariant": "rgb(82, 67, 69)",
      "outline": "rgb(132, 115, 117)",
      "outlineVariant": "rgb(214, 194, 196)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(54, 47, 48)",
      "inverseOnSurface": "rgb(250, 238, 238)",
      "inversePrimary": "rgb(255, 177, 192)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(250, 242, 247)",
        "level2": "rgb(247, 236, 242)",
        "level3": "rgb(244, 230, 237)",
        "level4": "rgb(243, 229, 235)",
        "level5": "rgb(241, 225, 232)"
      },
      "surfaceDisabled": "rgba(32, 26, 27, 0.12)",
      "onSurfaceDisabled": "rgba(32, 26, 27, 0.38)",
      "backdrop": "rgba(58, 45, 47, 0.4)"
    }
  }

  useEffect(() => {
    Promise.all([
      refreshPromise(),
      AsyncStorage.getItem('config')
    ])
      .then(values => {
        if (values[1] !== null) {
          const newConfig = JSON.parse(values[1]);
          setStateConfig(newConfig);
          const filteredLots = values[0].filter(lot => {
            if (config.isVisitor && lot.types.includes('Visitor')) {
              return true;
            }
            if (config.userType === 'student' && lot.types.includes('Employee')) {
              return false;
            }
            return (config.commuterType === 'residential' && lot.types.includes('Residential'));
          });
          setLotData(filteredLots.map(lot => {
            return Object.assign({}, lot,
              { isFavorite: newConfig.favorites.includes(lot.name) });
          }));
          setPage('home');
        } else {
          /* No config is set. Request the first run page. */
          setLotData(values[0].map(lot => {
            return Object.assign({}, lot, { isFavorite: false });
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
          <PaperProvider theme={theme}>
            <HomePage
              flipFavorite={flipFavorite}
              lots={lotData}
              refresh={refreshLotData}
              page={page}
              setPage={setPage}
              acknowledged={acknowledged}
              setAcknowledged={setAcknowledged}
            />
          </PaperProvider>
        </SafeAreaProvider>
      )
    case 'account':
      return (
        <SafeAreaProvider>
          <PaperProvider theme={theme}>
            <AccountPage
            page={page}
            setPage={setPage}
            config={config}
            setStateConfig={setStateConfig}
          /></PaperProvider>
        </SafeAreaProvider>
      )
    case 'lot':
      return <LotPage />
    case 'driving':
      return <DrivingPage />
    case 'first_run':
      return (
        <PaperProvider theme={theme}>
          <FirstRunPage goHome={() => setPage('home')} />
        </PaperProvider>
      )
    case 'error':
    default:
      return <ErrorPage />
  }
}

export default App;


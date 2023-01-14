import AsyncStorage from '@react-native-async-storage/async-storage';

export type GoatConfigType = {
  usertype: 'student' | 'staff';
  preferred_lot: string;
  favorites: string[];
  first_open: boolean;
  config_set: boolean;
};

let config: GoatConfigType = {
  usertype: 'student',
  preferred_lot: '',
  favorites: [],
  first_open: false,
  config_set: false
};

export function setGoatConfig(new_config: GoatConfigType) {
  config = new_config;
  AsyncStorage.setItem('config', JSON.stringify(new_config))
    .then(r => console.log('config saved'));
}

export function getGoatConfig(): Promise<GoatConfigType> {
  if (config.config_set) {
    return new Promise((resolve, reject) => {
      resolve(config);
    });
  }

  return AsyncStorage.getItem('config').then(r => {
    if (r !== null) {
      config = JSON.parse(r);
      config.config_set = true;
      return config;
    }
    return config;
  });
}
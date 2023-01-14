import AsyncStorage from '@react-native-async-storage/async-storage';

// export function setGoatConfig(new_config: GoatConfigType) {
//   AsyncStorage.setItem('config', JSON.stringify(new_config))
//     .then(r => console.log('config saved'));
// }

// export function getGoatConfig(): Promise<GoatConfigType> {
//   return AsyncStorage.getItem('config').then(r => {
//     if (r !== null) {
//       const config = JSON.parse(r);
//       config.config_set = true;
//       return config;
//     }
//
//     /* No config is set. Request the first run page. */
//     return {
//       usertype: 'student',
//       preferred_lot: '',
//       favorites: [],
//       first_open: true,
//     };
//   });
// }
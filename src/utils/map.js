import maps from 'qqmap';

export function TMap() {
  let that = this;
  return new Promise(resolve => {
    maps.init(that.$mapKey, () => {
      resolve(maps);
    });
  });
}
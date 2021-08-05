import { pick } from 'lodash';

interface UserProfileListViewData {
  info: string;
  status: boolean;
  data: $TSFixMe;
}
interface ListViewData {
  info: string;
  status: 'active' | 'inactive';
  data: $TSFixMe;
}

export const userProfilesDataProcessor = async (data: $TSFixMe): Promise<Array<UserProfileListViewData>> => {
  const parsedData: Array<UserProfileListViewData> = data.map(item => {
    let info = Object.values(item).join(' | ');
    if (info.length > 100) {
      info = info.substr(0, 100) + '...';
    }
    const status = pick(item, ['status']);
    const mappedData = pick(item, Object.keys(item));
    return { info, status: status.status, data: mappedData };
  });
  return parsedData;
};

export const flattenData = (item: $TSFixMe) => {
  const newT = Object.assign(
    {},
    ...(function _flatten(o) {
      return [].concat(
        ...Object.keys(o).map(k => {
          if (o[k]) {
            return typeof o[k] === 'object' ? _flatten(o[k]) : { [k]: o[k] };
          }
        }),
      );
    })(item),
  );
  return newT;
};

export const listViewDataProcessor = async (data: $TSFixMe): Promise<Array<ListViewData>> => {
  const parsedData: Array<ListViewData> = data.map(item => {
    let info = Object.values(flattenData(item)).join(' | ');
    if (info.length > 100) {
      info = info.substr(0, 100) + '...';
    }
    const status = pick(item, ['status']);
    const mappedData = pick(item, Object.keys(item));
    return { info, status: status.status, data: mappedData };
  });
  return parsedData;
};

type ComparatorDataTypes = 'string' | 'number' | 'object' | 'date';
type SortyByTypes = 'asc' | 'desc';
export const compareValues = (key: string, dataType: ComparatorDataTypes = 'string', order: SortyByTypes = 'asc') => {
  return function innerSort(_a, _b) {
    const a = dataType === 'object' ? flattenData(_a) : _a;
    const b = dataType === 'object' ? flattenData(_b) : _b;

    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    let varA, varB;

    if (dataType === 'number') {
      varA = parseInt(a[key]);
      varB = parseInt(b[key]);
    } else if (dataType === 'string' || dataType === 'object') {
      varA = a && a[key] && typeof a[key] === 'string' && a[key].toUpperCase();
      varB = b && b[key] && typeof b[key] === 'string' && b[key].toUpperCase();
    } else if (dataType === 'date') {
      varA = new Date(a[key]);
      varB = new Date(b[key]);
    }

    let comparison = 0;

    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === 'desc' ? comparison * -1 : comparison;
  };
};

export const leafGenerator = (obj: any, path: string): string =>
  path && path.split('.').reduce((value, el) => value[el], obj);

export const flattenObject = _object => {
  const result = Object.assign(
    {},
    ...(function _flatten(o) {
      return [].concat(...Object.keys(o).map(k => (typeof o[k] === 'object' ? _flatten(o[k]) : { [k]: o[k] })));
    })(_object),
  );
  return result;
};

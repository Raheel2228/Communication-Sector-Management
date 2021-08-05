// is a temporary fix, should be replaced later on
declare type $TSFixMe = any;

interface ChildTabProps {
  name: string;
  callback: (name: string, rowData: any) => void;
}

interface Tab {
  name: string;
  prefix?: string;
  title: string;
  child?: string;
  isNested?: boolean;
}

interface SelectFieldOptionType {
  id?: string;
  value: string;
  label: string;
}

interface ServiceCatalog {
  sort(arg0: (_a: any, _b: any) => number);
  serviceId;
  serviceName;
  serviceType;
  serviceCategory;
  pkgDisplayName;
  serviceConfig: {
    connectionType;
    capacity;
    capacityUnit;
    maxUploadCapacity;
    maxDownloadCapacity;
    classACapacity;
    classBCapacity;
    classCCapacity;
    classDCapacity;
  };
  nrc;
  yrc;
  status;
}

enum StatusType {
  active,
  inactive,
}

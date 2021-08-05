enum ServiceType {
  INTERCONNECT,
  SERVICEPORT,
  ANCILLARY,
  IOT,
  SMARTHOMES,
}

enum ServiceCategory {
  business = 'business',
  residential = 'residential',
}

enum ConnectionType {
  SHARED,
  FTTH,
  FTTB,
  FTTP,
  DEDICATED,
  DDC,
}

enum PaymentMode {
  QUARTERLY,
  BIYEARLY,
  YEARLY,
}

interface ServiceConfig {
  connectionType: ConnectionType;
  capacity: number;
  capacityUnit: string;
  maxUploadCapacity: number;
  maxDownloadCapacity: number;
  classACapacity: number;
  classBCapacity: number;
  classCCapacity: number;
  classDCapacity: number;
}

interface B2BCatalogItem {
  serviceId: string;
  serviceName: string;
  serviceType: ServiceType;
  serviceCategory: ServiceCategory;
  pkgDisplayName: string;
  serviceConfig: ServiceConfig;
  nrc: number;
  yrc: number;
  serviceDuration: number;
  paymentMode: PaymentMode;
  status: StatusType;
  statusChangeDate: Date;
  creationDate: Date;
}

interface B2BSubscriptions {
  subscriptionId: string;
  rspId: number;
  subsCreationDate: Date;
  subsStartDate: Date;
  subsEndDate: Date;
  subsYrc: number;
  subsNrc: number;
  taxAmount: number;
  totalAmount: number;
  autoRenewFlag: boolean;
  lockCatService: boolean;
  createdBy: string;
  serviceDetails: B2BCatalogItem;
  status: StatusType;
  statusChangeDate: Date;
}

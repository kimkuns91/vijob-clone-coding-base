export interface IJobCategory {
  id: number;
  parentId: number | null;
  i18nNames: {
    KO_KR: string;
    EN_US: string;
  };
}
export interface IJob {
  id: number;
  payAmount: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  categoryId: number;
  workWeekDays: string[];
  isClosed: boolean;
  business: IBusiness;
  i18nDescription: {
    EN_US: string;
    KO_KR: string;
  };
  i18nTitle: {
    EN_US: string;
    KO_KR: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  address: IAddress;
}

export interface IBusiness {
  id: number;
  name: string;
  ownerName: string;
  employeesCount: number;
  location: {
    latitude: number;
    longitude: number;
  };
  email: string;
  establishedDate: string;
  websiteUrl: string;
  address: IAddress;
}
export interface IAddress {
  zipCode: string | null;
  provinceCode: string;
  cityCode: string;
  roadAddress: string;
}

export interface IProvinces {
  code: string;
  name: string;
}

export interface ICity {
  provinceCode: string;
  code: string;
  name: string;
  address: string;
}

const CURRENCY = [
  {
      code: 'USD',
      nameTW: '美金'
  },
  {
      code: 'JPY',
      nameTW: '日幣'
  },
  {
      code: 'CNY',
      nameTW: '人民幣'
  },
  {
      code: 'AUD',
      nameTW: '澳幣'
  },
  {
      code: 'CAD',
      nameTW: '加拿大幣'
  },
  {
      code: 'CHF',
      nameTW: '瑞士法郎'
  },
  {
      code: 'EUR',
      nameTW: '歐元'
  },
  {
      code: 'GBP',
      nameTW: '英鎊'
  },
  {
      code: 'HKD',
      nameTW: '港幣'
  },
  {
      code: 'NZD',
      nameTW: '紐西蘭幣'
  },
  {
      code: 'SEK',
      nameTW: '瑞典幣'
  },
  {
      code: 'SGD',
      nameTW: '新加坡幣'
  },
  {
      code: 'THB',
      nameTW: '泰銖'
  },
  {
      code: 'ZAR',
      nameTW: '南非幣'
  },
  {
      code: 'TWD',
      nameTW: '新臺幣'
  }
];

export class Currency {
    code: string;
    nameTW: string;
}

export enum GoldType {
    // 台幣
    TWD = 'XAT',
    // 美金
    USD = 'XAU'
}

export class CurrencyConst {
    static getCCYByCode(code: string): Currency {
        return CURRENCY.find(ccy => ccy.code === code);
    }
}

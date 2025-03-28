export const getFlagEmoji = (currency: string) => {
  const currencyToCountry: {[key: string]: string} = {
    USD: 'US',
    PKR: 'PK',
    EUR: 'EU',
    GBP: 'GB',
    INR: 'IN',
    CAD: 'CA',
    AUD: 'AU',
    JPY: 'JP',
    CNY: 'CN',
    SAR: 'SA',
    AED: 'AE',
    TRY: 'TR',
    AFN: 'AF',
    ALL: 'AL',
    AMD: 'AM',
    ANG: 'AN',
    AOA: 'AO',
    ARS: 'AR',
    AWG: 'AW',
    AZN: 'AZ',
    BAM: 'BA',
    BBD: 'BB',
    BDT: 'BD',
    BGN: 'BG',
    BHD: 'BH',
    BIF: 'BI',
    BMD: 'BM',
    BND: 'BN',
    BOB: 'BO',
    BRL: 'BR',
    BSD: 'BS',
    BTN: 'BT',
    BWP: 'BW',
    BYN: 'BY',
    BZD: 'BZ',
    CDF: 'CD',
    CHF: 'CH',
    CLP: 'CL',
    COP: 'CO',
    CRC: 'CR',
    CUP: 'CU',
    CVE: 'CV',
    CZK: 'CZ',
    DKK: 'DK',
    DOP: 'DO',
    DZD: 'DZ',
    EGP: 'EG',
    ERN: 'ER',
    ETB: 'ET',
    FJD: 'FJ',
    FKP: 'FK',
    GEL: 'GE',
    GHS: 'GH',
    GIP: 'GI',
    GMD: 'GM',
    GNF: 'GN',
    GTQ: 'GT',
    GYD: 'GY',
    HKD: 'HK',
    HNL: 'HN',
    HRK: 'HR',
    HTG: 'HT',
    HUF: 'HU',
    IDR: 'ID',
    ILS: 'IL',
    IQD: 'IQ',
    IRR: 'IR',
    ISK: 'IS',
    JMD: 'JM',
    JOD: 'JO',
    KES: 'KE',
    KGS: 'KG',
    KHR: 'KH',
    KMF: 'KM',
    KPW: 'KP',
    KRW: 'KR',
    KWD: 'KW',
    KYD: 'KY',
    KZT: 'KZ',
    LAK: 'LA',
    LBP: 'LB',
    LKR: 'LK',
    LRD: 'LR',
    LSL: 'LS',
    LYD: 'LY',
    MAD: 'MA',
    MDL: 'MD',
    MGA: 'MG',
    MKD: 'MK',
    MMK: 'MM',
    MNT: 'MN',
    MOP: 'MO',
    MRU: 'MR',
    MUR: 'MU',
    MVR: 'MV',
    MWK: 'MW',
    MXN: 'MX',
    MYR: 'MY',
    MZN: 'MZ',
    NAD: 'NA',
    NGN: 'NG',
    NIO: 'NI',
    NOK: 'NO',
    NPR: 'NP',
    NZD: 'NZ',
    OMR: 'OM',
    PAB: 'PA',
    PEN: 'PE',
    PGK: 'PG',
    PHP: 'PH',
    PLN: 'PL',
    PYG: 'PY',
    QAR: 'QA',
    RON: 'RO',
    RSD: 'RS',
    RUB: 'RU',
    RWF: 'RW',
    SBD: 'SB',
    SCR: 'SC',
    SDG: 'SD',
    SEK: 'SE',
    SGD: 'SG',
    SHP: 'SH',
    SLL: 'SL',
    SOS: 'SO',
    SRD: 'SR',
    SSP: 'SS',
    STN: 'ST',
    SVC: 'SV',
    SYP: 'SY',
    SZL: 'SZ',
    THB: 'TH',
    TJS: 'TJ',
    TMT: 'TM',
    TND: 'TN',
    TOP: 'TO',
    TTD: 'TT',
    TWD: 'TW',
    TZS: 'TZ',
    UAH: 'UA',
    UGX: 'UG',
    UYU: 'UY',
    UZS: 'UZ',
    VES: 'VE',
    VND: 'VN',
    VUV: 'VU',
    WST: 'WS',
    XAF: 'CM', // Central African CFA Franc (used in multiple countries)
    XCD: 'AG', // East Caribbean Dollar (used in multiple countries)
    XOF: 'SN', // West African CFA Franc (used in multiple countries)
    XPF: 'PF', // CFP Franc (used in multiple territories)
    YER: 'YE',
    ZAR: 'ZA',
    ZMW: 'ZM',
    ZWL: 'ZW',
  };

  const countryCode = currencyToCountry[currency] || 'US';

  return countryCode
    .split('')
    .map(char => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join('');
};

export interface MarketPrice {
  commodity: string;
  price: string;
  trend: 'up' | 'down' | 'stable';
  market: string;
}

export const MOCK_MARKET_DATA: MarketPrice[] = [
  { commodity: 'Maize', price: 'KSh 4,200 / 90kg', trend: 'up', market: 'Nairobi' },
  { commodity: 'Beans', price: 'RWF 800 / kg', trend: 'down', market: 'Kigali' },
  { commodity: 'Coffee', price: 'UGX 7,500 / kg', trend: 'stable', market: 'Kampala' },
  { commodity: 'Potatoes', price: 'RWF 450 / kg', trend: 'up', market: 'Musanze' },
  { commodity: 'Rice', price: 'UGX 4,000 / kg', trend: 'stable', market: 'Bugiri' },
];

export interface WeatherForecast {
  day: string;
  temp: number;
  condition: string;
  rainfall: string;
  action: string;
}

export const MOCK_WEATHER_DATA: WeatherForecast[] = [
  { day: 'Today', temp: 24, condition: 'Moderate Rain', rainfall: '15mm', action: 'Good for planting maize' },
  { day: 'Tomorrow', temp: 26, condition: 'Sunny', rainfall: '0mm', action: 'Apply mulch to retain moisture' },
  { day: 'Sat', temp: 22, condition: 'Heavy Rain', rainfall: '45mm', action: 'Check drainage systems' },
];

export enum WeatherIcon {
    ClearDay = 'wb_sunny',
    ClearNight = 'nights_stay',
    PartlyCloudyDay = 'cloud_queue',
    PartlyCloudyNight = 'cloud_queue',
    Cloudy = 'cloud',
    HeavyCloudy = 'cloud',
    LightRain = 'grain',
    RainDay = 'umbrella',
    RainNight = 'umbrella',
    Thunderstorm = 'flash_on',
    Snow = 'ac_unit',
    Fog = 'blur_on',
    Default = 'cloud_queue'
  }
  
  export function getWeatherIcon(icon: string): string {
    switch (icon) {
      case '01d': return WeatherIcon.ClearDay;
      case '01n': return WeatherIcon.ClearNight;
      case '02d': return WeatherIcon.PartlyCloudyDay;
      case '02n': return WeatherIcon.PartlyCloudyNight;
      case '03d':
      case '03n': return WeatherIcon.Cloudy;
      case '04d':
      case '04n': return WeatherIcon.HeavyCloudy;
      case '09d':
      case '09n': return WeatherIcon.LightRain;
      case '10d': return WeatherIcon.RainDay;
      case '10n': return WeatherIcon.RainNight;
      case '11d':
      case '11n': return WeatherIcon.Thunderstorm;
      case '13d':
      case '13n': return WeatherIcon.Snow;
      case '50d':
      case '50n': return WeatherIcon.Fog;
      default: return WeatherIcon.Default;
    }
  }
  
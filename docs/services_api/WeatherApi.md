# WeatherApi

## Description

## Authentication

You need to signup and then you can find your API key under your account, and start using API right away!
Try our weather API by using interactive API Explorer or use Swagger Tool.
We also have SDK for popular framework/languages available on Github for quick integrations.
Want to choose which weather field to return in the API response? Change it from API response fields.

API access to the data is protected by an API key. If at anytime, you find the API key has become vulnerable, please regenerate the key using Regenerate button next to the API key.

Authentication to the WeatherAPI.com API is provided by passing your API key as request parameter through an API .
key parameter

```http
key=YOUR_API_KEY
```

## Requests

### Request URL

Request to WeatherAPI.com API consists of base url and API method. You can make both HTTP or HTTPS request to our API.

Base URL: `http://api.weatherapi.com/v1`

| API | API Method |
| --- | --- |
| Current weather | /current.json or /current.xml |
| Forecast | /forecast.json or /forecast.xml |
| Search or Autocomplete | /search.json or /search.xml |
| History | /history.json or /history.xml |
| Marine | /marine.json or /marine.xml |
| Future | /future.json or /future.xml |
| Time Zone | /timezone.json or /timezone.xml |
| Sports | /sports.json or /sports.xml |
| Astronomy | /astronomy.json or /astronomy.xml |
| IP Lookup | /ip.json or /ip.xml |

### Request Parameters

| Parameter |     | Description |
| --- | --- | --- |
| key | Required | API Key |
| q   | Required | Query parameter based on which data is sent back. It could be following:<br><br>* Latitude and Longitude (Decimal degree) e.g: q=48.8567,2.3508<br>* city name e.g.: q=Paris<br>* US zip e.g.: q=10001<br>* UK postcode e.g: q=SW1<br>* Canada postal code e.g: q=G2J<br>* metar:&lt;metar code&gt; e.g: q=metar:EGLL<br>* iata:&lt;3 digit airport code&gt; e.g: q=iata:DXB<br>* auto:ip IP lookup e.g: q=auto:ip<br>* IP address (IPv4 and IPv6 supported) e.g: q=100.0.0.1<br>* By ID returned from Search API. e.g: q=id:2801268<br>* bulk New |
| days | Required only with forecast API method. | Number of days of forecast required.<br><br>days parameter value ranges between 1 and 14. e.g: days=5<br><br>If no days parameter is provided then only today's weather is returned. |
| dt (Required for History and Future API) | Restrict date output for Forecast and History API method. | For history API 'dt' should be on or after 1st Jan, 2010 in yyyy-MM-dd format (i.e. dt=2010-01-01)<br><br>For forecast API 'dt' should be between today and next 14 day in yyyy-MM-dd format (i.e. dt=2010-01-01)<br><br>For future API 'dt' should be between 14 days and 300 days from today in the future in yyyy-MM-dd format (i.e. dt=2023-01-01) |
| (Optional) unixdt | Unix Timestamp used by Forecast and History API method. | unixdt has same restriction as 'dt' parameter. Please either pass 'dt' or 'unixdt' and not both in same request. e.g.: unixdt=1490227200 |
| (Optional) end_dt (Available for History API) | Restrict date output for History API method. | For history API 'end_dt' should be on or after 1st Jan, 2010 in yyyy-MM-dd format (i.e. dt=2010-01-01)<br><br>'end_dt' should be greater than 'dt' parameter and difference should not be more than 30 days between the two dates.<br><br>**Only works for API on Pro plan and above.** |
| (Optional) unixend_dt | Unix Timestamp used by History API method. | unixend\_dt has same restriction as 'end\_dt' parameter. Please either pass 'end\_dt' or 'unixend\_dt' and not both in same request. e.g.: unixend_dt=1490227200 |
| (Optional) hour | Restricting forecast or history output to a specific hour in a given day. | Must be in 24 hour. For example 5 pm should be hour=17, 6 am as hour=6 |
| (Optional) alerts New | Disable alerts in forecast API output | alerts=yes or alerts=no |
| (Optional) aqi New | Enable/Disable Air Quality data in forecast API output | aqi=yes or aqi=no |
| (Optional) tides New | Enable/Disable Tide data in Marine API output | tides=yes or tides=no |
| (Optional) tp New | Get 15 min interval data for Forecast and History API. Available for Enterprise clients only. | tp=15 |
| (Optional) lang | Returns 'condition:text' field in API in the desired language | Please pass 'lang code' from below table. e.g.: lang=fr |

## Example Requests

WeatherAPI.com API is so easy to implement.
Look at following examples on how you can form a request to get data either through a web browser or in your application.

1. So to get current weather for London:  
   JSON:

   ```http
   http://api.weatherapi.com/v1/current.json?key=&lt;YOUR\_API\_KEY&gt;&q=London
   ```

    XML:

    ```http
    http://api.weatherapi.com/v1/current.xml?key=&lt;YOUR\_API\_KEY&gt;&q=London  
    ```

2. To get 7 day weather for US Zipcode 07112:  
   JSON:

   ```http
   http://api.weatherapi.com/v1/forecast.json?key=&lt;YOUR\_API\_KEY&gt;&q=07112&days=7
   ```

    XML:

    ```http
    http://api.weatherapi.com/v1/forecast.xml?key=&lt;YOUR\_API\_KEY&gt;&q=07112&days=7  
    ```

3. Search for cities starting with Lond:  
   JSON:

   ```http
   http://api.weatherapi.com/v1/search.json?key=&lt;YOUR\_API\_KEY&gt;&q=lond  
   ```

    XML:

    ```http
    http://api.weatherapi.com/v1/search.xml?key=&lt;YOUR\_API\_KEY&gt;&q=lond
    ```

## Error Codes

If there is an error, API response contains error message including error code for following 4xx HTTP Status codes.

| HTTP Status Code | Error code | Description |
| --- | --- | --- |
| 401 | 1002 | API key not provided. |
| 400 | 1003 | Parameter 'q' not provided. |
| 400 | 1005 | API request url is invalid |
| 400 | 1006 | No location found matching parameter 'q' |
| 401 | 2006 | API key provided is invalid |
| 403 | 2007 | API key has exceeded calls per month quota. |
| 403 | 2008 | API key has been disabled. |
| 403 | 2009 | API key does not have access to the resource. Please check pricing page for what is allowed in your API subscription plan. |
| 400 | 9000 | Json body passed in bulk request is invalid. Please make sure it is valid json with utf-8 encoding. |
| 400 | 9001 | Json body contains too many locations for bulk request. Please keep it below 50 in a single request. |
| 400 | 9999 | Internal application error. |

## External Documentation

- [WeatherAPI.com](https://www.weatherapi.com/docs/)

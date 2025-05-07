#include <DHT.h>
#include <WiFi.h>
#include "time.h"
#include <HTTPClient.h>
#include <Arduino_JSON.h>

#define DHTPIN 4
#define DHTTYPE DHT11

// Baudrate for Serial Monitor
#define SERIAL_BAUDRATE 9600

DHT dht(DHTPIN, DHTTYPE);

const char* ssid = "****SSID**";
const char* password = "****PASSWORD**";

// Server endpoint
const char* serverName = "http://example.com/api/data";  // Replace with your server URL

const char* ntpServer = "pool.ntp.org";
const long  gmtOffset_sec = 0;
const int   daylightOffset_sec = 3600;

// Timer
unsigned long delay = 500;
unsigned long lastTime = 0;
unsigned long timerDelay = 120000;  // 2 minutes

struct tm timeinfo;

void setup() {
  Serial.begin(SERIAL_BAUDRATE);
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(delay);
    Serial.print(".");
  }

  Serial.println("");
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());

  // Init and get the time
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
  getLocalTime(&timeinfo);
  
  dht.begin();
}

void loop() {
  if ((millis() - lastTime) > timerDelay) {
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();

    if (isnan(temperature) || isnan(humidity)) {
      Serial.println("Failed to read from DHT sensor!");
      return;
    }

    Serial.print("Temp: ");
    Serial.print(temperature);
    Serial.print(" °C | Humidity: ");
    Serial.println(humidity);

    if (WiFi.status() == WL_CONNECTED) {
      WiFiClient client;
      HTTPClient http;
      http.begin(client, serverName);
      http.addHeader("Content-Type", "application/json");

      if(!getLocalTime(&timeinfo)){
        Serial.println("Failed to obtain time");
        return;
      }
    
      // Maak JSON object met Arduino_JSON
      JSONVar jsonObject;
      jsonObject["timestamp"] = &timeinfo;  // Tijd in ms sinds opstarten
      jsonObject["temp"] = temperature;
      jsonObject["humidity"] = humidity;

      String jsonString = JSON.stringify(jsonObject);
      Serial.println("Sending JSON: " + jsonString);

      // Verstuur als POST
      int httpResponseCode = http.POST(jsonString);

      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);

      http.end();
    } else {
      Serial.println("WiFi Disconnected");
    }

    lastTime = millis();
  }
}

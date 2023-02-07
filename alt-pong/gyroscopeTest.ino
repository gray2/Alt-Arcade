/*
  Arduino LSM6DS3 - Simple Gyroscope

  This example reads the gyroscope values from the LSM6DS3 sensor 
  and prints them to the Serial Monitor or Serial Plotter, as a directional detection of 
  an axis' angular velocity.

  The circuit:
  - Arduino Uno WiFi Rev2 or Arduino Nano 33 IoT

  Created by Riccardo Rizzo

  Modified by Benjamin Dannegård
  30 Nov 2020

  This example code is in the public domain.
*/


#include <Arduino_LSM6DS3.h>



float x, y, z;
int plusThreshold = 30, minusThreshold = -30;


const int gyroSmoothRead = 20;

int gyroReadings[gyroSmoothRead];
int gIndex = 0;
int gTotal = 0;
int gAvg = 0;


void setup() {
  Serial.begin(9600);
  while (!Serial);
  Serial.println("Started");

  if (!IMU.begin()) {
    Serial.println("Failed to initialize IMU!");
    while (1);
  }
  Serial.print("Gyroscope sample rate = ");
  Serial.print(IMU.gyroscopeSampleRate());
  Serial.println(" Hz");  
  Serial.println();
  Serial.println("Gyroscope in degrees/second");
}


void loop() {
  
  if (IMU.gyroscopeAvailable()) {
    IMU.readGyroscope(x, y, z);

   
  }
  if(y > plusThreshold)
  {
    Serial.println("Collision front");
    Serial.println(y);
    delay(50);
  }
  if(y < minusThreshold)
  {
    Serial.println("Collision back");
    Serial.println(y);
    delay(50);
  }
  if(x < minusThreshold)
  {
   //Serial.println("Collision right");
    Serial.println(x);
    delay(500);
  }
    if(x > plusThreshold)
  {
    
   // Serial.println("Collision left");
    Serial.println(x);
    delay(500);
  }
  
}

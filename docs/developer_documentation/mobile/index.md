<!-- omit in toc -->
# Mobile documentation

<!-- omit in toc -->
## Table of contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Using Expo Go](#using-expo-go)
  - [Using an emulator](#using-an-emulator)

## Introduction

The mobile is a mobile application using the [React Native](https://reactnative.dev/) framework.  
The mobile uses the [Expo](https://expo.io/) framework to manage the deployment.

## Prerequisites

- [Expo CLI](https://docs.expo.io/workflow/expo-cli/)
- [Expo Go](https://expo.io/client) (on your phone, optional)
- [Expo account](https://expo.io/signup)

## Installation

First, go to the `/mobile` directory:

```bash
cd mobile
```

Then, you need to install the dependencies:

```bash
npm install
```

Finally, you can run the application:

```bash
npm start
```

### Using Expo Go

You can use the Expo Go application to run the application on your phone.  
Scan the QR code displayed in the terminal or copy the link displayed in the terminal and paste it in the Expo Go application.  
It will automatically open the application.  

### Using an emulator

You can use an emulator to run the application on your computer.  
To do this, you need to install the [Android Studio](https://developer.android.com/studio) or [Xcode](https://developer.apple.com/xcode/) IDE.  
Then, you need to create a virtual device.  

Finally, pres `a` in the terminal to run the application on the Android emulator or `i` to run the application on the iOS emulator.  

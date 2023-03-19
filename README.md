# Task for D3V Tech
## Built using React-Native

## Installation

```sh
- git clone https://github.com/nandha-kumar-hajari/d3v_task.git
- cd [project directory]
- npm install
- react-native run android (or) npm run android
```

## Packages used


| Package | Source |
| ------ | ------ |
| Lottie | [https://www.npmjs.com/package/lottie-react-native] |
| FastImage | [https://github.com/DylanVann/react-native-fast-image] |
| FastImage | [https://github.com/DylanVann/react-native-fast-image] |
| Vector Icons | [https://github.com/oblador/react-native-vector-icons] |
| Paper | [https://callstack.github.io/react-native-paper/] |

## Working flow
- First when the app is opened, we ask the user to login.
- If the user has an account, he can login, if not he can choose to Signup
- As dummyjson api was used, you will be able to signup using any credentials, but only login using limited ones
- For now you can use these dummy credentials to login to the app:
   username: "kminchelle"
   password: "0lelplR"


## Screenshots
#### Login Screen
![alt text](https://i.ibb.co/Bfm8Lfs/Screenshot-2023-03-20-at-1-10-35-AM.png)

#### Signup Screen
![alt text](https://i.ibb.co/pKP8CvK/Screenshot-2023-03-20-at-1-11-04-AM.png)

#### HomeScreen
![alt text](https://i.ibb.co/2v5bwzz/Screenshot-2023-03-20-at-1-13-32-AM.png)

## Directory Structure

```
project
│   README.md
│   App.tsx
│   package.json
└───src
│   │   __mocks__
│   └───assets
│       │   animations
│       │   fonts
│   └───components   
│   └───navigation 
│   └───screens
│       │   __tests__
│       │   homescreeencomponent
│       │   loginscreencomponent
│       │   signupscreencomponent

```



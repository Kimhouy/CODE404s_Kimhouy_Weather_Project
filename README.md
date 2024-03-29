# Weather Project 
* This project is initiated to encourage learning how to make real requests to see data, fetch data, and transform data to dispaly on the app, in the React project. 
* This weather app provides access to forcasts that will help users to be alerted and informed about the changes in weather conditions;hence, the users can make decisons and deal with it accordingly. 

Click "Demo App" below for viewing the app.
# [Demo App](https://weather-host-sage.vercel.app/)

## 1. Project Overview
The app is implemented based on Vitejs and React framework, style with CSS and other design/building tools such as:
* Figma 
* Drawio
* Notation
* github

  ## External libraries needed to be installed:
  * React-Geolocated module: npm install react-geolocated 
  * React-Axios module: npm install axios 

## 2. Functions 
 The app will notify users about the weather information from Today to the next four days. The information includes:
- Today date and overall temperature. 
- users location(city, and country)
- wetaher description and feel like temperature 
- maximum and minimum temperatures 
- humidity rate and wind speed 
- sunset and sunrise hours
- the forcast for the next four hours
- the weather conditions for the next four days as well.

## 3. Convention Guide
Please, refer to [Convention Guide](https://fresh-chiller-b75.notion.site/Weather-Project-Convention-guide-e9c925b18caa4d9683d19ed4e56fe685) for more detail.

## 4. Figma UX/UI 
Please, refer to [UX/UI Design](https://www.figma.com/file/RXA74djqfURdg2kllV8OtN/Untitled?type=design&mode=design&t=JyZVwbzneLrGzZQG-0) for more detail.
## 5. App Flow
Please, refer to [App Flow](https://drive.google.com/file/d/1D1s1T0MiO3oGy50wgerxIshf0Hc50A_c/view?usp=sharing) for more detail.

## 6. Git Flow Method
Please refer to [Git Flow Method](https://www.notion.so/Git-Flow-Method-4555db0de8294536b09411c195f9ee1d?pvs=4) for more detail.

## 7. Backlog
- The current hour might be a little lagger than the actual hour few minuttes. That's becuase I fetch dt data to convert it into date and time and api data fetching needs time to be processing. 
- The app is suitable for desktop full screen only.
- To open the app, the user have to allow and turn on the location.

## Self-Reflection and Personal Development: 
- For this project, I did it follow through the "Modern React with Redux [2023 Update]" course of Udemy; mostly in section 5.
- Other majority parts of the project like choosing datas to be called to displayed, api id to the package of houly and daily forcasts, using loops and slice in javascript, and other related inquiries, I did research on OpenWeather, on some random sources, and receiving assistances from my teammates and other friends as well. 
- I have seperated the component files into three files and named them more clearly iaccording to their display sections,functionalities, and api data called(except few parts where it is necessary to use different api data). Plus, I have put contiditons to check whether the data is avaiable or not, when the data is available, there is a messsage to tell the user that the data is loading, and when there is error occur, the user also get a message as well. 
- After this project, my conceptions about react, making requests and fetching data using api, data flow, relationship between parent file and child files, and using async:await have become more clearer than before. I will also keep trying to make more progresses on other things as well.  

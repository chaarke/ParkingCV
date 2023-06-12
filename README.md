# ParkingCV
WPI Hack 2023 - Best Community Hack 
https://devpost.com/software/gompei-s-lot-spotter

## Inspiration
No WPI experience proves more mind numbing than finding an open parking spot. At best, street parking turns into a gladiatorial arena where only the quickest motorists can find a sufficient parking spot to arrive on time to their morning meetings. As such, we developed a remedy to this monumental problem: Gompei's Lot Spotter.

## What it does
Utilizing the wealth of theory from the fields of computer vision and region-based convolutional neural networks, our app takes images of WPI parking lots, counts the number of occupied spaces, and informs the motorist of the availability of remaining spaces in the lot. This just-in-time solution for parking-knowledge-as-a-service PKaaS™️ gives you the foresight of whether a lot will be worth your precious time.

## How we built it
### Backend
We repurposed a pre-trained FasterRCNN vehicle detection model provided in MATLAB that was designed for autonomous driving uses. This model runs on a Python webserver.

### Webserver
The webserver is a simple Flask app that periodically updates the numbers of parking lots from images uploaded.

### Frontend
We created a cross-platform app to display our data using React Native. Users are able to select their preferred lots so that they can easily see how many spots are available.

## Challenges we ran into
Given more time and proper computing resources, we would train our own detection model to specifically detect cars from overhead view. This does require better data than our minimal set of personally collected phone photos.

## Accomplishments that we're proud of
Cross-platform app development which was new to all of us.

## What's next for Gompei's Lot Spotter
Training a neural network ourselves for the specific use case to receive higher accuracy. We've identified the FAIR1M dataset as a potential option, although finding parking lots in this dataset requires extensive cleaning.

## Build

Build files can be created by navigating to the folder and running `npm install`
Then, run `npx react-native eject` to generate `ios` and `android` build folders.

Then, you can follow the usual steps to run react-native projects in your emulator of choice.

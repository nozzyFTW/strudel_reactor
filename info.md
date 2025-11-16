# Strudel Reactor

## About the Project

<div align='center'>
    <img src='readMeAssets/image-3.png' style='width: 75%;'>
</div>

\<insert a description of Strudel Reactor here>

### Built With

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) &nbsp;
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

## Getting Started

### Prerequisites

Before you can setup the application to run, there are a few required pieces of software that will need to be installed on your system. These are:

1. [Node.JS v18+](#nodejs)
2. [npm](#npm)

#### Node.JS

To install Node.JS, head over the the [Node.JS](https://nodejs.org/en/download) website and install the latest LTS version available.

After following the installation guide, check that it has successfully installed by running the following command in the Terminal:

```
node -v
```

You should see a response similar to the following image if it has successfully installed.

![alt text](readMeAssets/image-1.png)

#### Node Package Manager (NPM)

It is suggested that you install the latest version on the Node Package Manager (npm) before attempting to run this application.

To install the latest version, type the following into your Terminal:

```
npm install npm@latest -g
```

## Usage

### Running the Application

To start running the application, enter the following command:

```
npm start
```

Upon load, you will be greated with the interface.

### Features

**Strudel Editor**

The Strudel Editor panel provides the interface for all processed Strudel code, which will be run upon the PLAY button getting clicked.

<div align="center">
    <img src='readMeAssets/image-4.png'>
</div>

**Text to Preprocess Editor**

Within the text area, shown in the image below, you can enter valid Strudel code to be loaded into the Strudel Editor panel. It is suggested that this area is used to enter all new music, and can be used to enter "tags" to utilise the provided controllers.

Within Strudel Reactor, there are five categories of tags that can be used - CPS, Volume, Mute, Reverb, and Filter.

<div align='center'>

|          Tag          | Category |                                   Description                                   |
| :-------------------: | :------: | :-----------------------------------------------------------------------------: |
|  <_TrackName_\_Mute>  |   Mute   |   Mutes the specified track (replace 'TrackName' with the actual track name).   |
| <_TrackName_\_Volume> |  Volume  |                  Adjusts the postgain of the track specified.                   |
|    <global_reverb>    |  Reverb  | Adjusts the global reverb properties (see [Reverb Controls](#reverb-controls)). |
| <_TrackName_\_reverb> |  Reverb  |                Adjusts the specified track's reverb properties.                 |
|   <global_low_pass>   |  Filter  |          Adjusts the Low Pass Frequency range through applying .lpf().          |
|  <global_band_pass>   |  Filter  |       Adjusts the Band/Mid Pass Frequency range through applying .bpf().        |
|  <global_high_pass>   |  Filter  |         Adjusts the High Pass Frequency range through applying .hpf().          |

</div>
<br>
<div align="center">
    <img src='readMeAssets/image-5.png'>
</div>

**Play and Processing Controls**

<div align="center">
    <img src='readMeAssets/image-11.png'>
</div>

**Volume Controls**

<div align="center">
    <img src='readMeAssets/image-8.png'>
</div>

**Reverb Controls**

<div align="center">
    <img src='readMeAssets/image-9.png'>
</div>

**Filter Controls**

<div align="center">
    <img src='readMeAssets/image-10.png'>
</div>

**Set CPS**

<div align="center">
    <img src='readMeAssets/image-5.png'>
</div>

**Visualiser**

<div align="center">
    <img src='readMeAssets/image-6.png'>
</div>

**JSON Import and Export**

<div align="center">
    <img src='readMeAssets/image-5.png'>
</div>

## Acknowledgements

This project has utilised:

-   [React-Bootstrap](https://react-bootstrap.netlify.app/) (v3.0.0-beta.5)
-   [Bootstrap](https://getbootstrap.com/) (v5.3)
-   [Bootstrap Icons](https://icons.getbootstrap.com/) (v1.13.1)
-   [react-circular-slider-svg](https://www.npmjs.com/package/react-circular-slider-svg) (v0.4.0)

These third-party packages have been utilised throughout Strudel Reactor to prove the user wit hthe best visual experience that we can provide. Prior to adding these third-party packages to the project, checks were conducted to ensure that they met expectations and were a definitive requirement for the system.

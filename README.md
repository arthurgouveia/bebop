#Bebop: Kickstart for websites and apps

<img align="right" height="260" src="http://bebop.bracketarmy.com/bebop.svg" alt="I'm Bebop, bitch!">

###WTF is Bebop

Bebop is a HTML5 and CSS3 boilerplate built on top of [HTML5 Boilerplate](http://html5boilerplate.com/) with the aid of [Compass](http://compass-style.org), [Grunt](http://gruntjs.com/) and [Bower](http://bower.io/) to kickstart and optimize the dev flow of simple websites and apps. It also brings together concerns about semantics and accessibility, so there's a simple yet helpful index file with a few WAI-ARIA roles and markup to help you start learning.

Talking Stylesheets, you'll notice the conditionals for lt IE9 and gt IE8. The way this project works is that it generates two separate CSS files, one using REM units and another one using PX, for legacy browsers, but you only need to maintain one single file. This is completely inspired by [Sébastien Axinté](http://twitter.com/SebastienAxinte)'s [REM to PX Browser Function](http://davidwalsh.name/rem-px-browser-function-sass) post. Check it out.

There's also a Sass function named "u", which stands for "units", and it's a modified version of [Sébastien Axinté](http://twitter.com/SebastienAxinte)'s function. It basically converts the numbers you use in your properties to REM.

Aside from that, [Bebop](http://en.wikipedia.org/wiki/Bebop_and_Rocksteady) is also a character from Teenage Mutant Ninja Turtles, which is a [warthog](http://en.wikipedia.org/wiki/Warthog), much similiar to Grunt's logo.

##Requirements

Install [Sass](http://sass-lang.com/install), [Compass](http://compass-style.org/install/), [Grunt](http://gruntjs.com/getting-started) and [Bower](http://bower.io/).

###Linux and Windows users

To optimize images [grunt-imageoptim](https://github.com/JamieMason/grunt-imageoptim) is by far better than [grunt-contrib-imagemin](https://npmjs.org/package/grunt-contrib-imagemin), but it only works for Mac. As I'm not aware of any other Grunt plugins that can do a better job, Bebop comes with it as an alternative.

###Mac OSX users

To use [grunt-imageoptim](https://github.com/JamieMason/grunt-imageoptim) it is required that you have both [ImageOptim](http://imageoptim.com) and [ImageAlpha](http://pngmini.com) installed at least, which are free. The [JPEGmini for Mac](https://itunes.apple.com/us/app/jpegmini/id498944723) is paid, and optional.

If you don't have JPEGMini and you want to use grunt-contrib-imagemin to optimize your JPEGs, just enable the task, register it and make it match only the .jpg files.

```javascript
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'dist/<%= dirs.img %>',
          src: ['*.jpg'],
          dest: 'dist/<%= dirs.img %>'
        }]
      }
    },

    imageoptim: {
      png: {
        options: {
          jpegMini: false,
          imageAlpha: true,
          quitAfter: true
        },
        src: ['dist/<%= dirs.img %>/**/*.png']
      }
    }
```

##Instalation and usage

###Using Grunt

Install the Grunt tasks devDependencies:

```shell
    npm install
```

Install the Bower packages:

```shell
    bower install
```

If you're on development, simply do:

```shell
    grunt
```

This will start a server for you on 127.0.0.1:9000, with a watch task for your HTML, Sass and JavaScript files, with LiveReload activated.

If you want to generate the deploy version, run:

```shell
    grunt build
```

It will create a dist folder only the with the files you need to deploy: concatenated and uglyfied JavaScript files, along with minified CSS and optimized imagery.

###Using Yeoman Generator

Install the Yeoman Generator for Bebop:

```shell
    npm install -g generator-bebop
```

Create a folder to your application and run the generator:

```shell
    yo bebop
```

ps.: Thanks, [Sérgio Vilar](https://github.com/sergiovilar), for this implementation :)

##Walkthrough

####Sass files

Inside **src/assets/sass** you'll find a series of files. The one you'll be dealing with, mostly, will be **_style.scss**.

Your main Sass files are **main.scss** and **main-ie.scss** but maintaining two files just to work with REM would be a pain, so those two files only import everything you need.

You should only need to work with **_style.scss**, **partials/_variables.scss** and **partials/_functions.scss**, along with any other partials you might want to create to organize your stylesheets. Just import them on **_style.scss**.

Sprites are configured out-of-the-box. Jump into **_style.scss** to check out how to make use of this goodness.

The folder **partials/h5bp** contains the CSS from HTML5 Boilerplate, split between files and imported inside **_style.scss**.

####JavaScript files

Inside **src/assets/js** you'll find a folder named **vendor**. It holds for you the jQuery 1.10.2 and Modernizr 2.7.1 minified version of these libs.

**main.js** should be used for your general JavaScript'ing.

**plugins.js** should hold all the plugins you might need/want to use. Just toss them in there, after the initial JS writen.

These two files, when you're running an watch task from Grunt will be concatenated into one single file: **scripts.js**. If you're running a __grunt build__ it will concatenate those two and then will run an uglify task on the resulting **scripts.js**.

####Images

Your images should the thrown inside the **src/assets/img** folder. Inside this folder you'll also find another one named **sprite**. This one has two sub-folders, **standard** and **retina**, which should contain your individual sprite images for standard DPI screens and high DPI screen, respectively.


##Roadmap

+ Deploy actions through Git and SFTP;
+ Find a better alternative for grunt-contrib-imagemin;
+ Create a fucking gh-pages repo with decent design and awesome documentation;
+ Add some bower implementation to increase time of up-to-date resources;

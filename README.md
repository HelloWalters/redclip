*Andrew Walters - 2021*

# Hello there!



Installation
Prerequisites

- **npm** is a package manager for the JavaScript programming language.
- **node.js** is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.
- **git** is a version control system for tracking changes in computer files and coordinating work on those files among multiple people. It is primarily used for source code management in software development.
- **docker**

Quickstart
[MEVN-CLI](https://github.com/madlabsinc/mevn-cli)

Using node package manager, intall the MEVN command line interface package tool, created by MadLabs Inc.

`npm install -g mevn-cli`


navigate to the directory containing the project root using a bash commands and run the command

`mevn dockerize`

this will build and initialise the project with three containers for the project
- **the database** (using mongoose/mongodb)
- **the server** (using nodejs and express)
- and **the client** (using nodejs, vuejs and a variety of other front end libraries and frameworks).

these will be launched on ports **27017**, **9000** and **8080** respectively (if the routes are available).

The project will also require an internet connection to link the image and video media links correctly.

The project also already holds some data volumes for the Mongo database within the repository from testing, to demonstrate the loading and saving functionality of the application.

---

*Further thoughts:*
*I have built application to the best of my abilities with the time given and spent most of my time configuring the backend server-side configuration, route handling and CRUD operations. I have not yet managed to implement a subcommenting option, as my time ran short with other responsibilities as well as problem-solving within the app.*
*I would have also liked to use VueX alongside webtokens to validate further against users, to ensure posts and comments cannot be liked by the poster. This will be something I add in the future when I have the time to revisit this project for my portfolio.*

---

### I hope you enjoy the application, and for anything further please get in touch with me at [andrew@hellowalters.com](mailto:andrew@hellowalters.com)!

*Regards!*

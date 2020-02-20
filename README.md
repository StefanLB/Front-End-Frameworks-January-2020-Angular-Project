![](https://img.shields.io/github/stars/StefanLB/Front-End-Frameworks-January-2020-Angular-Project)
![](https://img.shields.io/github/issues/StefanLB/Front-End-Frameworks-January-2020-Angular-Project)
![](https://img.shields.io/github/repo-size/StefanLB/Front-End-Frameworks-January-2020-Angular-Project)
![](https://img.shields.io/github/license/StefanLB/Front-End-Frameworks-January-2020-Angular-Project)

# Front-End-Frameworks-January-2020-Angular-Project
SoftUni Front-end Frameworks Individual Project Assignment


## Bidding Wars

### Project Summary

This **Angular 8** application represents an **auction platform** which can be used by registered users for the **purpose of buying/selling items**.

When creating a bid, the seller provides details regarding the item *(such as name, description, photo)*, as well as a starting bid and an expiration date. Bids can be modified *(edited/deleted)* by their owners, provided no one has placed a bid yet and if it has not yet expired. The items are sold to the highest bidder at the time of auction expiration. Once a bid is placed, it cannot be retracted under any circumstances *(i.e. it is final)*. Users are allowed to bid as many times as they like, as long as the bid has not reached its expiration date. Placing a new bid on an item requires the bidder to offer a higher price than the current highest price.

---

### Functionality

* **Anonymous users can**:
  * View a sample of the latest bids;
  * View the about and contacts page;
  * Login;
  * Register.
  
* **Registered users can**:
  * View all bids;
  * View their created bids;
  * View the offers they’ve placed a bid on;
  * View a specific bid’s details;
  * Create bids;
  * Edit their created bids;
  * Delete their created bids;
  *	Place bids on offered items;
  *	View and update their profile;
  *	View the about and contacts page;
  * Logout.

---

### Built With

* [Angular 8](https://angular.io/) - Web Framework
* [Angular Material](https://material.angular.io/) - UI/UX component library
* [Node.js](https://nodejs.org/en/) - JavaScript runtime environment
* [Npm](https://www.npmjs.com/get-npm) - Package manager
* [Firebase](https://firebase.google.com/) - Cloud-hosted NoSQL database/Backend
* [Visual Studio Code](https://code.visualstudio.com/) - IDE

---

### Build and Run

Make sure you have Node.js installed on your machine.
Using the node package manager *(npm)*, install the Angular CLI.

```
npm i -g @angular/cli
```

All other project dependencies are listed in the **package.json** file. Install them via the package manager.

```
npm i
```

Once all dependencies are installed, build and launch the application through the Angular CLI.

```
ng s --open
```

---

![](https://img.shields.io/github/commit-activity/w/StefanLB/Front-End-Frameworks-January-2020-Angular-Project)
![](https://img.shields.io/github/forks/StefanLB/Front-End-Frameworks-January-2020-Angular-Project)
![](https://img.shields.io/github/tag/StefanLB/Front-End-Frameworks-January-2020-Angular-Project)

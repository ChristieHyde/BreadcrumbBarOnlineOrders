# BREADCRUMB BAR

## Description
This cite is a online food ordering and delivery platform for primarily Sandwiches with other side dishes as extra options.
The motivition for this came from a mixture of uber eats but specifically for sandwiches like that of Subway where in the
future people may even be able to craft their own sandwiches over picking pre-made ones.

## Table of Contents
* [User Story](#user-story)

* [Acceptance Criteria](#acceptance-criteria)

* [Installation](#installation)

* [Images](#images)

* [Links](#links)

## User Story

```md
AS A standard user
I WANT to view sandwich presets and other products
SO THAT I can order a meal
```

## Acceptance Criteria

```md
AS AN admin user
I WANT to update the store products
SO THAT users can choose their meals with up-to-date menu information
ACCEPTANCE CRITERIA
GIVEN a full-stack sandwich ordering website
WHEN I visit the website
THEN I am presented with a login page
WHEN I sign up with new account information
THEN a standard user account is created with the account information and I am logged in
WHEN I log in with a standard user account
THEN I am taken to the homepage, which has a navigation bar with options Home, Menu, Order, Account, Logout
WHEN I click on the Menu option in the navigation bar
THEN I am taken to the Menu page, which includes a list of preset sandwich options and other menu items
WHEN I click on a sandwich
THEN I am shown a description of the sandwich, a list of ingredients and an Add to Order button
WHEN I click on another menu item
THEN I am shown a description of the item and an Add to Order button
WHEN I click Add to Order
THEN the item is added to my order (temp storage?)
WHEN I click on the Order option in the navigation bar
THEN I am shown the items in my order as well as a Checkout button
WHEN I click on Checkout
THEN I am prompted to enter "payment information"
WHEN I confirm checkout
THEN the order is posted to the database and I am taken to a confirmation screen
WHEN I click on the Account option in the navigation bar
THEN I am shown my account information (ext. and can rename account and add payment information to prefill)
WHEN I click on Logout
THEN I am presented with a confirmation modal to confirm that I am logging out
WHEN I confirm that I want to logout
THEN I am logged out of my account
```

## Installation
The site can be viewed at https://breadcrumb-bar-online-78eb7902420c.herokuapp.com/.

## Usage
Upon loading the site, a user will be prompted to log in or sign up to the site.
Once they are logged in, they will be taken to the homepage, where they will be able to view their account profile, go to the menu and checkout their order.
Clicking on Menu at the homepage takes the user to the Menu page, where they can click on the items they want to add to their order.
Clicking on Checkout in the navigation bar will allow the user to view their order with its total price.
```md
NOTE: Currently checking out the order is not implemented, to prevent financial data from being added to the demo.
```
Clicking on Profile in the navigation bar takes the user to their profile page, where they can see how many orders they have placed.

## Links
Github: [Link text](https://github.com/ChristieHyde/BreadcrumbBarOnlineOrders)
Site: [Link text](https://breadcrumb-bar-online-78eb7902420c.herokuapp.com/)
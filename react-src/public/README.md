# ambrosia

https://ambrosiarotorua.co.nz

Ambrosia Rotorua Restaurant &amp; Bar 
WP theme with React.js

The 'Menu' section is the React.js application.

**THIS IS DEV MODE. SCRIPTS ARE NOT BUILT**

All menus are managed by 'Quick Restaurant Menu' plugin, but default front-end is not used.
React gets the menus using custom API endpoints

React application built with router (v.4), axios, query-string and react-image-lightbox
All dependencies are in package.json

Bootstrap 4 is used for styling

The main page is generated on server. It uses standard posts and pages types from WordPress. 
'Posts' for displaying special offers.
'Pages' for displaying main page content (all pages are shown on main page staggered)



**Features:**

All links open the exact React page in the menu. For example: 

https://ambrosiarotorua.co.nz/menu/dinner/ shows dinner

https://ambrosiarotorua.co.nz/menu/bar-snacks-tapas-and-platters/?search=lamb shows 'lamb' search results in Bar snacks menu


The "Menu" link stores the last opened URL (when the menu is closed)

The website is responsive and mobile optimized

Standard WP gallery output changed for 'slider' (see photos on main page)

'Users' are hidden from standard WP API

scrollreveal.js used for some main page animation

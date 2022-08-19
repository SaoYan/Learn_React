# burger-builder  

![](assets/preview.jpeg)  

This is the course project of the Udemy course [React - The Complete Guide](https://www.udemy.com/course/react-the-complete-guide-incl-redux/). This is not 100% the exact version in the course. I made lots of changes myself.  

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  

<span style="font-size:large"><strong>Welcome to play with this APP and report bugs, suggest improvements, etc. :)</strong></span>

## If you would run the code...

The backend is [Firbase](https://firebase.google.com/). Start your own project and change the URLs and API key in `/src/axios.js` based on your own project.  

If you are not familiar with Firebase, you may find this useful: [Firebase Auth REST API](https://firebase.google.com/docs/reference/rest/auth)  

## Task Checklist  

* Basic UI  
  - [x] ~~Main page: burger builder, real-time preview~~  
  - [x] ~~modal, toolbar, sidedrawer~~  
* HTTP resuets  
  - [x] ~~Fetching default burger info~~  
  - [x] ~~Submit order to store in database~~  
* Routing  
  - [x] ~~Checkout page~~  
  - [x] ~~Order history page~~  
* Redux  
  - [x] ~~Using Redux to maintain global state~~  
  - [x] ~~Move HTTP requests to within asyn actions~~  
* Authentication  
  - [x] ~~Sign-up and sign-in~~  
  - [x] ~~Reset password~~  
  - [x] ~~Logout~~  
  - [x] ~~Show pages only when authenticated~~  
  - [x] ~~Persistent auth session using local storage~~  
  - [x] ~~Fetching or deleting user-specific orders; deleting one specific order~~  
  - [x] ~~Unexpired session unless log out~~  
  - [ ] APP security  
  - [ ] Form validation for password ([reference implementation](https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_password_val))  
* Testing  
  - [x] ~~Unit tests~~  
* Misc  
  - [ ] Local cache  
  - [x] ~~How to delete one order (instead of the entire orders.json) via Firebase's REST API~~  
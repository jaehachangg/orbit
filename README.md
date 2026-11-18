# ORBIT - CS50x Final Project
## Video Demo: https://www.youtube.com/watch?v=F8pLMe4cYaw
## Overall
    For this project, my web-based application is a walkthrough of all the celestial bodies in our solar system, introducing and explaining the differences in atmosphere, gravity, and scale between the sun and the eight planets. I utilized manipulating arrays to access and manage data throughout my whole project, while learning many different CSS stylings while figuring out how to style the website in the way I wanted. 

    I especially used DOM manipulation to dynamically add elements through javascript into my html page, for all my dialog popups, while learning how to appendChild() to multiple different elements creating an append tree, which was particularly cool and satisfying to code. DOM manipulation was especially useful when linking my CSS to my javascript, as I could label each new element with classes created within javascript using classList.add. Using the classList.add, I was also able to add and remove an "active" class, which selected the current planet the user was on, and could add specific stylings and interactions for each individual planet. 

    Event listeners are the foundational structures my whole website is based on, and I think this project heavily increased my comfort in using event listeners, and how to utilize them in different ways, not just "click". 

    In addition to event listeners, requestAnimationFrame() helped out a ton in my gravity and atmosphere transitions, which I'll explain more in depth.

### Atmosphere
    I chose the atmosphere because I wanted to learn how to store, manage, and access data in order to create graphs, and informational visual structures to display data for each of the planets. 

    The surprisingly hardest part about this section was not necessarily the data or the displays of the bar graphs, but more the styling and transitions of the animations. Having to learn fade transitions and all the different transform variables I had to add in CSS was very difficult, as keeping track of all the different transitions were proving to be confusing. 
    
    CSS was also difficult because with the transitions, I also created masks for the pie chart as it wasn't as simple as increasing the bar-fill value. I had to create a mask for the initial pie chart, and then remove that mask in a circular motion, to create the animation of the pie chart. AI was of use in this section in explaining and showing me how all the CSS stylings (masks and transitions) linked together to create the animation.

### Gravity
    I chose gravity, because I wanted to learn how to incorporate math and formulas into my code, to create diagrams, or animations that use calculated numbers. 

    The calculations were not the hard part, as it only took up 7 lines of code or so, but the requestAnimationFrame() section was especially difficult, as the location of the ball had to be actively updated every millisecond or so, while changing the accceleration and speed of the ball every frame. The requestAnimationFrame() was the most crucial to this step, and as time-based animation was comppletely new to me, Youtube and AI was of assistance to learning how to code the animation and catch bugs in which I could not find within my animation loops.

    Collision detection was also used to prevent the ball from leaving the simulation window when dropped or dragged.

    Within this section I also dived into where a user could drag and click a variable, which would actively update the balls position as the user moved their mouse, this was cool and very useful to understanding how event listeners worked even more, with all the different ways an event could be activated.

### Scale
    Scale was the easiest, because at this point I was very familiar with my projects code, and it was only scaling the images and fitting them within my dialog size.

    At least I thought, until I realized that the true diameter of the planet was not equal to the width of the image, as images like the sun (with the solar flare details) and saturn(with it's rings) did not properly align with the ratio of the diameter to the image like all the other planets. AI was used in determining how to resolve this problem, as I did not know how to measure the planets size compared the pixels of the image. AI figured out the ratios of the planets to the image size, and I inputted those numbers into my planetData array as imageDiscFraction, which I used to calculate within my scale event listener, that resized the window to the size of the biggest planet, which also dividing the planet diameters and the imageDiscFraction to get ratios more accurate to the true diameter scale between the Earth and other planets. 

    I had some difficulty with the styling in trying to fit Saturn into my preferred window, and some modifications were helped by AI to fix the size issues.

## Conclusion
    CSS stylings were the hardest to get a grasp on, because as the project went on, it became overwhelmingly difficult to navigate, in trying to maintaining the same hex codes, trying to remember why I made small changes to certain properties when bug fixing, and also knowing which properties to even select to change what. A lot of googling was done to help figure out what property I needed to change to actually visually change what I wanted to. 

    I also figured out how to truly debug, as the code got out of hand, it wasn't as easy as to just point and figure out what the issue was like I was able to in the previous problem sets. Using console.log to figure out where my calculations went wrong, or using the actual f12 console section to find what was blocking my code from executing, to going into my f12 code to figure out why something wasn't printing or updating the way I wanted it to.

    I'm not sure if I hit everything I learned and all the functionalities of my website, I did do a full walkthrough of my website in my video, so hopefully that helps more with the actual interactivity of the website, and hopefully this README helped understand my thinking and what I learned while building this project. Thank you CS50.
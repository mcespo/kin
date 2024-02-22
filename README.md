# Kin Exam

## About the exam

Hello, I have created an HTML index page, styles page, and javascript files to complete the Kin Frontend exam. The output is a simple HTML page that is meant to submit a fake form. I will also post a recording of this walkthrough should you wish to have a visual component to the work.

[Kin video walkthrough](https://www.loom.com/share/684e7f59c75843c7abd1c9fe9a83f5ad?sid=26218f96-e9c0-4177-b1b4-f3afaa12731c)

### How to access

To view the page, please visit the [Kin Exam GitHub Page](https://mcespo.github.io/kin/). Otherwise, feel free to fork this project or clone as you see fit. Note that you should be able to either directly click the `index.html` file or run a local server to get the site working in your personal machine. I opted to not use any library whatsoever to make the project accessible to run (the one exception is Jest - I wanted to at least have that to run tests against my javascript functions but it should not be necessary to load the site).

### Approach to the problem

I began by taking note of the elements that needed inputs and which of them were going to require a decent amount of attention, namely the credit card input and expiration year. With this in mind, I visited a Shopify storefront, the Microsoft online store, the Google online store and Apple online store. It would have been unusual for those vendors to not have a pattern or something to gleam from how they manage input fields. The biggest thing that caught my attention was the usage of HTML input patterns and the need to make just about everything a text input field. It took me by surpise but it was the start of a big ol' journey for me.

After completing all the input fields, I downloaded what I believed to be the font this project used as well as the image files. I converted the images to WEBP as they would help filesize (only slightly), and did a font conversion to woff2 to help the font load of the project.

When moving into CSS, I drafted out a sketch of what I expect to see on a mobile device that is unusually tiny, an iOS device, a possible portrait tablet, all the way to a narrow large device. In anyting that was very small, seeing the credit card image display seemed more like a distraction so I removed it from viewports under `368px` wide. I show it for anything above that while removing the back card. Once we have more room, I bring in the original design, up until we get to wide screens where we have enough breathing room to honor the original PDF mockup.

I also implemented a dark mode to the page. Please dont be alarmed if it catches you offguard. I just wanted to make things easy on the eyes for the user but note that I would not implement such a layout without consulting the creative team.

> #### Regarding CSS
> Since I did not use SCSS, LESS, nor Tailwind, I opted for CSS with native nesting. I did the project quickly and it may feel like th styles and classes are a little all over the place. My main intent was to live in one CSS document with a mobile first approach. I only modify styles as the larger viewports call for modifications. I also did not use any naming patterns such as BEM, as I did not want to spend too much time on this particular aspect of the challenge beyond honoring the visual fidelity of the designs.

The JavaScript was the next task. This was a bit of a whirlwind for me. I had assumed the Luhn extra credit challenge was going to be the behemoth of the project. After doing the equation on paper with my spouse with our actual credit cards, the sequence took about 30 minutes to program. The thing that genuinely took me forever was devising a means to ensure text inputs would only accept numeric values. That is admittedly the one part I had to look up solutions for. I am grateful to [Kevin Powell](https://www.youtube.com/shorts/nnZS761ngXE) for giving me a solution that was not as insane as the path I was going down.

After I got a series of methods in order, I chose to split them into separate JavaScript files, and create a semi-fuctional/kinda object oriented programming approach to the methods, trying to separate validators from modifiers. I finished up with error inputs, aria labels for errors, subtle color shift animations, (as mentioned above...) mobile styles and dark mode, and tests against fuctions using Jest.

I am hopeful most if not all of this makes some sense and hope you have a great day as well.


### Final thoughts

Hey, this was one of the most valuable exams I have taken in years. It was thoughtful, challenging, and deeply satifying to complete. Thank you for taking the time to produce this, and I look forward to seeing if we can continue the conversation. Thank you so so much for your time. I hope you have an incredible day, and I look forward to continuing the conversation in the coming weeks. Stay safe my friends.



# Recruitment Card Challenge

Check [preview.gif](preview.gif) in your browser. Your work is to recreate all animations, all input actions and design from gif using this package.

![Preview](https://tools.fcbhealthspark.com/share/learning/credit-card.gif)


## What is done

- All images are imported into project.
- Default configuration is set up to just run ``` npm run dev ``` to start project.
- Imports of custom modules (empty files) for your code. It will work as soon as you write your code.

## What you need to do

- Create html structure using correct semantics for elements.
- Create js functions which will trigger all form actions on the card preview.
- Create sass styles to all elements to make them look like on preview.
- Export project using ```npm run export```
- Push project to your account as fork and send link to it to interviewers e-mail address.

## Few tips
- Remember about responsiveness
- Use correct semantics, remember about BEM etc.
- Don't rush, do as much as you can. Writing all with wrong code is worse than creating only half of task, but with great code.
## Run Locally

Clone the project

```bash
  git clone https://github.com/ipghealth-spark-warsaw/recruitment-card-challenge
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Deployment

To export this project as website run

```bash
  npm run build
```

Check build folder to get website files.
## Precreated modules

```pug
mixin addPicture(url,imgClass,styles)
```
***url*** - name and extension of image located in images example usage ``` addPicture('background.jpg','background-image','display: block; margin: 0;)```

***imgClass*** - your scss class for this image

***styles*** - add inline styles if needed




## External documentation

- [PugJS](https://pugjs.org/api/getting-started.html)
- [Sass](https://sass-lang.com/documentation/)
- [Webpack](https://webpack.js.org/concepts/)
- [ECMA6](https://262.ecma-international.org/6.0/)


## Authors

- [@dpierzak](https://github.com/dpierzak) - dawid.pierzak@fcbhealthspark.com


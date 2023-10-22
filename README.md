# **Project Title: CalorizAI**

## **Project Description:**

When turning over a new leaf, ones initial focus often shfits towards improving their overall wellbeing.
This project aims to offer individuals a personalized AI doctor for mental, and physical health, along with a calorie tracking tool to help users manage their dietary choices.

This is a Fullstack project taht was made using Next.js, Typescript, Tailwindcss and Redux-Toolkit.

## **File Structure:**

## **How To Run Our Program:**

1. Ensure you have Node.js version above 18.0.
2. run -> npm install
3. run -> npm run dev

## **Who Built This?**

- Gaspar Fung, gaspar.tan1189@gmail.com, gastove#7774
- Kshitij Goyal, kshitijgoyal7@gmail.com, Blabberboy#7557, +16046034140
- Ishwak Sharda, ishwak.sharda@gmail.com, +16728336400

## **List of Libraries, API, other resources**

- Undraw.io - 2 images used in the welcome page (doctor & a person shopping)
- @reduxjs/toolkit: version 1.9.7
- firebase: version 10.5.0
- next: version 13.5.6
- openai: version 4.12.4
- react: version 18.2.0
- react-dom: version 18.2.0
- react-router-dom: version 6.17.0
- moment version: 2.29.4
- react-redux: version 8.1.3
- react-icons: version 4.11.0
- uuid: version 9.0.1
- autoprefixer: version 10
- eslint": version 8
- eslint-config-next: version 13.5.6
- postcss: version 8
- tailwindcss: version 3.3.3
- typescript: version 5

## APis

- Nutritionix API
- OpenAI

## !!!IMPORTANT

- We are using OpenAI api key and since the repository is public, openAI might disable the API key which will result in the chatbot not working
- To fix, this you can use your own open AI key by going on the website and use it.
- To do so, go on src/chat-api/index.ts, section apiKey field.

# **Link to Github Repository: https://github.com/shardaishwak/sfu-hack-2023**

## Folder structure

--- Folder Structure ---
.env.local
.eslintrc.json
[.git]
├── COMMIT_EDITMSG
├── FETCH_HEAD
├── HEAD
├── ORIG_HEAD
├── config
├── description
├── [hooks]
├── applypatch-msg.sample
├── commit-msg.sample
├── fsmonitor-watchman.sample
├── post-update.sample
├── pre-applypatch.sample
├── pre-commit.sample
├── pre-merge-commit.sample
├── pre-push.sample
├── pre-rebase.sample
├── pre-receive.sample
├── prepare-commit-msg.sample
├── push-to-checkout.sample
└── update.sample
├── index
├── [info]
└── exclude
├── [logs]
├── HEAD
└── [refs]
├── [heads]
├── integrate-chat
├── integrate-firebase
├── main
└── nutritionix-api
└── [remotes]
└── [origin]
├── dev-2
├── integrate-chat
├── integrate-firebase
├── ksh
├── main
└── nutritionix-api

.gitignore
[.next]
README.md
next.config.js
package-lock.json
package.json
postcss.config.js
[public]
├── AI.jpg
├── adaptive-icon.png
├── chocolate.jpg
├── doctor.png
├── favicon.ico
├── groceries.png
├── next.svg
└── vercel.svg
[src]
├── cache.ts
├── [chat-api]
└── index.ts
├── colors.ts
├── [components]
├── AiButton.tsx
├── Body.tsx
├── Card.tsx
├── GoogleSignIn.tsx
├── InputBox.tsx
├── LoginButton.tsx
├── Navbar.tsx
├── RenderSessions.tsx
├── ReplyBox.tsx
├── SubmitButton.tsx
└── Welcome.tsx
├── [firebase]
└── index.ts
├── [global]
└── db.ts
├── interface.ts
├── log.ts
├── [nutritionix-api]
└── index.ts
├── [pages]
├── \_app.tsx
├── \_document.tsx
├── [api]
└── hello.ts
├── chat.tsx
├── index.tsx
├── login.tsx
├── main.tsx
└── newItem.tsx
├── [provider]
├── context.tsx
└── [store]
├── [actions]
├── cache.action.ts
├── dateConsumption.action.ts
└── profile.action.ts
├── index.tsx
└── [reducers]
├── cache.reducer.ts
├── dateConsumption.reducer.ts
├── general.reducer.ts
└── profile.reducer.ts
├── [styles]
└── globals.css
└── time.ts
tailwind.config.ts
tsconfig.json
yarn.lock

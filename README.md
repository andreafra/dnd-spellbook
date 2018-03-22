## DnD Spell Cards Online

An online tool to build a custom deck of spell for DnD 🐉.

**It was a project I made for private and didactic purposes only.
Of course you should own you copy of the Player's Handbook, which I own and [you can own too](https://smile.amazon.com/Players-Handbook-Dungeons-Dragons-Wizards/dp/0786965606)!**

### Demo
Check out the live version [here](https://andreafranchini.me/dnd-spell-cards-online)!

### Test it yourself!

- Clone the the repo in the desired directory.

- Run `npm install` inside the directory.

- Run `yarn start` (you may have to install [Yarn](https://yarnpkg.com/en/docs/install])).

- Your browser should open on `localhost:3000` and you can live-test the code!

- Run `yarn build` to create the `/dist` folder!

### Cards Source

- Cards value are taken from a modified version of [austen0's JSON spells](https://github.com/austen0/dnd_5e_spells) (I manually removed all the HTML tags in it). You could technically generate a JSON for whatever game you want if you provide the correct properties :)

- The file is `src/spells.json`

*If you deploy your own version online, mind to change the `const __PATH__` at the beginning of `src/index.js` to your domain.*

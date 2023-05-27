# Net Ninja Course 
> [Youtube video](https://www.youtube.com/watch?v=SnoAwLP1a-0&list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp).
> [MongoDB Atlas](https://cloud.mongodb.com/).
> [Git Guide](https://github.com/iamshaunjp/node-express-jwt-auth).

## 05. Github codespace connection (incl. MongoDB) & Schema data validation (error handling)
### .devcontainer
To use Github codespace online... 
- Configure codespace: https://www.youtube.com/watch?v=ocPOHZJ21jE
In commands: 
	- `Codespaces: Add Dev Container Configuration Files...`
	- `Codespaces: Rebuild Container`
- Connect with MongoDB Atlas: https://www.youtube.com/watch?v=X88dsegH0-Y

### dotenv package
To get .env file secrets, on root directory. 
Use in `app.js`.

### validator package
To easily validate data format (eg. email format).
No need to use RegEx javascript vanilla.

## 06. mongoose Schema Hooks
To execute a function, before and/or after a HTTP request.
Example: function after and before POST method for a route.

## 07. bcrypt: hashing a password
Install package: `npm i bcrypt`.

## 08. Auth views

## 09. Cookies
Install package: `npm i cookie-parser`.
Import and use middleware in app server: `app.use(cookieParser())`.

## 10. JWT
Install package: `npm i jsonwebtoken`.
Import: `const jwt = require('jsonwebtoken')`.


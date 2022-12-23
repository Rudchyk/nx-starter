start:
	yarn create nx-workspace --package-manager=yarn

init: init-dep init-dev

init-dep:
	yarn add @reduxjs/toolkit redux-thunk redux react-redux notistack passport passport-local randomstring react-hook-form @hookform/resolvers yap i18next classnames @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/lab @mui/x-data-grid bcrypt js-cookie jsrsasign nodemailer cors axios consola cookie-parser express-session moment morgan winston http-errors express-graphql graphql express-route-parser express-session handlebars swagger-ui-express mongoose connect-mongo express express-openapi @apollo/client react-i18next yup

init-dev:
	yarn add --dev @types/bcrypt @faker-js/faker @types/js-cookie @types/jsrsasign

lib:
	yarn nx generate @nrwl/react:library react-custom-hooks --style=none --appProject=gui --importPath=@rch --unitTestRunner=none --no-interactive --no-component
	yarn nx generate @nrwl/workspace:library interfaces --no-component --importPath=@interfaces --unitTestRunner=none --no-interactive --no-component
	yarn nx generate @nrwl/workspace:library constants --no-component --importPath=@constants --unitTestRunner=none --no-interactive --no-component
	yarn nx generate @nrwl/react:library ui --importPath=@ui --appProject=gui --no-component --no-interactive
	yarn nx generate @nrwl/storybook:configuration --name=ui --uiFramework=@storybook/react --no-interactive
	yarn nx generate @nrwl/workspace:remove ui-e2e --no-interactive
	yarn nx generate @nrwl/workspace:library --no-component --name=utils --importPath=@utils --no-interactive
	yarn add --dev @nrwl/storybook

api:
	yarn add --dev @nrwl/express
	yarn nx g @nrwl/express:app api --frontend gui
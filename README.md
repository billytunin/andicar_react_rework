This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## TODOs

- ¿Pensar el tema de los iconos para las categorias?
- Obtener un favicon.ico mas lindo de alguna manera
- ¿Agregar "eliminar" consultas? Ya que ya tengo la feature de archivarlas
- Agregar validaciones a los fields de cuando estás editando un producto como admin
- - Usar el componente validationInput
- Cuando haga el admin de modificacion de productos, acordarse de la validacion de maxlength de Categoria
- Que las imagenes que se vayan a subir, sean en un nuevo bucket de AWS con permisos puestos
- Ver como se ve el sitio en mobile/ipad
- Borrar la carpeta features/counter cuando no la necesite más
- Revisar si se están usando los especificadores globales de index.css (tipo "rightAligned", "displayBlock", etc)
- Meter filtros de busqueda (por fecha, por texto que abarque nombre+mail+consulta) en ConsultasList
- Pensar que hacer con el "deprecated findDOMNode" warning (mas info [aca](https://github.com/nanxiaobei/react-slide-routes))

- ¿Donde me quede?
- - Ver el TODO de Andicar BE sobre el getTotalProducts
- - ¿Implementar que se puedan buscar varios productos con el BuscadorDeProductos.tsx? ¿Es una feature que queremos? Consultar con Fede. Si no la queremos, podría hacer que el BuscadorDeProductos.tsx busque en el onChange, usando lodash/debounce





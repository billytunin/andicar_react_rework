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

### Consideraciones
- Estoy teniendo que mantener Producto.tsx y NewProducto.tsx . Son dos componentes que quizas se podrían mergear de alguna manera. Pero tiene sus quirks

## TODOs
- Implementar delete para categorias? Si asi fuera, implementar una categoria DEFAULT. Cuando borras una categoria, todos los productos que quedarían "categoria-less" pasarian a ser de la categoria DEFAULT.

## TODOs que se pueden hacer post-launch
- Invertir la logica de "archivados". En vez de que sea true para cuando están inactivos tanto en FE como en BE, que sea true para cuando están activos. Y la propiedad se pasaria a llamar "activo" o algo asi.
- - Buscar en el codigo -> // TODO: Cambiar esto cuando cambie "archivado" por "activo"
- Mejorar el ValidationInput. Cuando editas esos fields anda lento y creo que puede tener que ver con estar editando el State en cada keystroke
- Usar lo de CDN Edge URL para el photos.andicar.com.ar
- Meter filtros de busqueda (por fecha, por texto que abarque nombre+mail+consulta) en ConsultasList
- Pensar que hacer con el "deprecated findDOMNode" warning (mas info [aca](https://github.com/nanxiaobei/react-slide-routes))
- Obtener un favicon.ico mas lindo de alguna manera


- ¿Donde me quede?
- - Calcular como quedaria el price para cada usuario considerando el nuevo redondear y el nuevo precio offset -> me parece que lo mejor va a ser empezar a calcular todo en el BE. Si no, es un quilombo el FE. Asi que en el BE tmb podria calcular lo de priceModifier + price offset + redondear. Y deberia tener un endpoint para getProductsAsAdmin y otro para getProducts de clientes?
- - Comentarle a fede que lo de precio offsets solo se puede hacer con el producto creado (yendo a modificarlo) + que se que hay un bug cuando tratas de escribir "-" al principio de un precio. Por ahora, se puede solucionar escribiendo el numero y despues yendo a ponerle el "-"






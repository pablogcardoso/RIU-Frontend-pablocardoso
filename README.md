# RiuHeroChallenge


Esta prueba tecnica fue realizada usando la versión 19+ de Angular.
No se uso NgRx, en su lugar se creo un servicio con signals para manipular el estado.
Los datos se trabajan en memoria no hay persistencia en storage o servicio alguno.

Se implemento Angular Material 19 para los estilos y componentes visuales.
Debido a la sencilles tampoco use Rxjs para comunicacion entre componentes o manipular llamadas a servicios externos.

Por cuestiones de tiempo no configure linter, aun asi se trabajo para tener un codigo lo mas claro y legible posible.

Para organizar las tareas use JIRA, Creando las siguientes epicas para trackear las HU que representan el trabajo realizado. detallo a continuación:

* RIU-01 Setup inicial
* RIU-14 Estructura de datos - dominio
* RIU-15 Directiva formateo de nombres
* RIU-11 Servicios heroes
* RIU-6 Pantalla Listado heroes
* RIU-12 Pantalla Alta heroes
* RIU-13 Pantalla Edición

Se creo una rama para trabajar en cada funcionalidad, cada una tiene el número de ticket asociado.

## Dependencias

* Angular material

## Dockerización
Se realizo la dockerizacion del proyecto usando las siguientes imagenes: 
* node:20
* nginx:alpine
  
## Monolito o Micro frontEnd
Se realizo la la aplicación como si se tratase de un monolito, pero con una estructura que permita facilmente generar un micro frontend.
En casos donde se trate de un monolito, crearía una carpeta modules, y crearía dentro de ella una carpeta para cada modulo o funcionalidad comun.
  
## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

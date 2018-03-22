# test-loompa
Oompa Loompa test

- CONSIDERATIONS -
This is my personal implementation of the Oompa Loompa test. There are some features that are incomplete or must be improved, since the goal of this test is to test the overall coding techniques. This misses and improvements will be discussed in "Improvements And Missing" section.

- HOW TO TEST IT -
The test assumes that Node.js is installed on the host machine, given the fact that uses some of its features. Once the app is downloaded to a folder, navigate to it with the terminal and first run <b>npm install</b> in order to all the dependencies to be installed. Once this finished, run <b>npm start</b>. This should open a new window on the default browser with the adress "http://localhost:3000". If not, just type the url manually in the browser.

- PROJECT STRUCTURE -
The project is implemented with <b>React</b>. The project is structured as follows.
<ul>
  <li>Containers
    <p>This folder holds all the class-components, which store the state for the app</p>
    <ul>
      <li><b>List: </b>The container fot the Oompa list elements. This list comes with an infinite scroll component(external) for rendering items from the server on demand and react-bootstrap component for making the list responsive.</li>
      <li><b>Detail: </b> The container for the detailed view of each item rendered inside the list</li>
    </ul>
  </li>
  </br>
  <li>Components
    <p>This folder holds all the  functional stateless components</p>
      <ul>
        <li><b>Item: </b>The component that renders the items contained in the list</li>
        <li><b>Detailed: </b> The component that renders the detailed view of each item from the list</li>
        <li><b>Header: </b> The component that renders the header</li>
        <li><b>Filter: </b> The component that filters the list with a given term</li>
        <li><b>Abstract: </b> The component that holds same data both in detail and item components</li>
    </ul>
  </li>
</ul>

- MISSINGS AND IMPROVEMENTS -
Due to lack of time, the project has some fails and some things that could be improved.
<ul>
  <li>Bugs
    <ul>
      <li>
          <p>The render of the list when data fetchs local sotorage gets bugy. This leads to the list getting indefinitely loading and the event from the scroll needing a wide movement upwards and downwards to continue rendering. This could be happening due to some react component life cycle hook being fired and re-rendering the list in an incorrect way.</p>
      </li>
    </ul>
  </li>
  </br>
  <li>Improvements
    <ul>
    <li>
        <p>The overall style could be improved a lot, including a fixed header and filter, thus only scrolling the list itself.</p>
    </li>
    <li>
        <p>The spinners and info-feedback from errors and waitings to the user should be improved.</p>
    </li>
    <li>
        <p>Considering usage of Redux to manage app state, although the state is not wide, that could make this decission a bit senseless.</p>
    </li>
    <li>
        <p>Usage of Higher Order Components pattern, to improve the reusage of components</p>
    </li>
    </ul>
  </li>
</ul>

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

class App extends React.Component {
    render() {
        return (
            <Container>
                <h1>Hello World!</h1>
            </Container>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root'),
);

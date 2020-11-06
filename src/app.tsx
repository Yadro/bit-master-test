import React, { ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import { Button, Container, Input } from 'semantic-ui-react';
import Map from './map';
import 'semantic-ui-css/semantic.min.css'

interface Props {}

interface State {
    search: string;
}

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            search: '',
        };
    }

    onChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ search: e.target.value });
    };

    render() {
        return (
            <Container>
                <h1>Детали заказа</h1>
                <div>
                    <Input onChange={this.onChange} />
                    <Button>Search</Button>
                </div>
                <Map/>
            </Container>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root'),
);

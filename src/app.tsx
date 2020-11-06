import React, { ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import { Button, Container, Input, Label } from 'semantic-ui-react';
import Map from './map';
import { MockHttpService } from './services/mockHttpService';
import { Address, CrewsInfo } from './services/requestTypes';
import 'semantic-ui-css/semantic.min.css'

interface Props {}

interface State {
    address: string;
    lon: number;
    lat: number;
    availableCrews: CrewsInfo[];
}

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            address: '',
            lon: 0,
            lat: 0,
            availableCrews: [],
        };
    }

    onChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ address: e.target.value });
    };

    onChoosePoint = (requestAddress: Address) => {
        const { address, coords } = requestAddress;
        this.setState({
            address,
            lat: coords[0],
            lon: coords[1],
        });
    }

    onMakeOrder = async () => {
        const availableCrews = await MockHttpService.getAvailableCrews(this.state);
        this.setState({
            availableCrews: availableCrews.crews_info,
        });
    };

    render() {
        const { address, availableCrews } = this.state;
        return (
            <Container>
                <h1>Детали заказа</h1>
                <div>
                    <Label>Откуда</Label>
                    <Input onChange={this.onChange} value={address}/>
                </div>
                <Map onClick={this.onChoosePoint} crews={availableCrews}/>
                <Button onClick={this.onMakeOrder}>Заказать</Button>
            </Container>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector('#root'),
);

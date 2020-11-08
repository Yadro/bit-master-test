import React, { ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import { Button, Container, Form, Grid, Input } from 'semantic-ui-react';
import Map from './components/map';
import CrewList from './components/crewList';
import CrewCard from './components/crewCard';
import MapHttpService from './services/mapHttpService';
import MockHttpService from './services/mockHttpService';
import { Address, Coords, CrewInfo } from './services/requestTypes';

interface Props {}

interface State {
    address: string;
    coords: Coords;
    availableCrews: CrewInfo[];
    selectedCrew: CrewInfo;
}

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            address: '',
            coords: null,
            availableCrews: [],
            selectedCrew: null,
        };
    }

    onChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ address: e.target.value });
    };

    onChoosePoint = async (requestAddress: Address) => {
        this.setState(requestAddress);
        await this.getCrew(requestAddress);
    }

    getCrew = async (address: Address) => {
        const availableCrews = await MockHttpService.getAvailableCrews(address);
        let selectedCrew;
        if (availableCrews[0]) {
            selectedCrew = availableCrews[0];
        }
        this.setState({
            availableCrews,
            selectedCrew,
        });
    }

    onMakeOrder = async () => {
        const { address } = this.state;
        const coords = await MapHttpService.geocoding(address);
        this.setState({
           coords,
        });
        await this.getCrew({ address, coords });
    };

    onChooseCrew = (crewId: number) => {
        const { availableCrews } = this.state;
        const selectedCrew = availableCrews.find(c => c.crew_id === crewId);
        this.setState({
            selectedCrew,
        });
    }

    render() {
        const { address, availableCrews, selectedCrew, coords } = this.state;
        return (
            <Container>
                <h1>Детали заказа</h1>
                <Form style={{ margin: '14px 0' }}>
                    <Form.Field required>
                        <label>Откуда</label>
                        <Input onChange={this.onChange} value={address}/>
                    </Form.Field>
                </Form>
                {selectedCrew &&
                    <CrewCard crew={selectedCrew}/>
                }
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <Map crews={availableCrews} coords={coords} onClick={this.onChoosePoint}/>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <CrewList crews={availableCrews} onClick={this.onChooseCrew}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <Button
                                style={{ width: '100%' }}
                                primary
                                onClick={this.onMakeOrder}
                            >{/* TODO align middle */}
                                Заказать
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Container>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector('#root'),
);

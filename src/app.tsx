import React, { ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import { Button, Container, Grid, Input, Label } from 'semantic-ui-react';
import Map from './components/map';
import CrewList from './components/crewList';
import MockHttpService from './services/mockHttpService';
import { Address, CrewInfo } from './services/requestTypes';
import 'semantic-ui-css/semantic.min.css'
import CrewCard from './components/crewCard';

interface Props {}

interface State {
    address: string;
    lon: number;
    lat: number;
    availableCrews: CrewInfo[];
    selectedCrew: CrewInfo;
}

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            address: '',
            lon: 0,
            lat: 0,
            availableCrews: [],
            selectedCrew: null,
        };
    }

    onChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ address: e.target.value });
    };

    onChoosePoint = async (requestAddress: Address) => {
        const { address, coords } = requestAddress;
        const params = {
            address,
            lat: coords[0],
            lon: coords[1],
        };
        this.setState(params);

        const availableCrews = await MockHttpService.getAvailableCrews(params);
        const crews = availableCrews.data.crews_info;
        let selectedCrew;
        if (crews[0]) {
            selectedCrew = crews[0];
        }
        this.setState({
            availableCrews: crews,
            selectedCrew,
        });
    }

    onMakeOrder = async () => {
        // TODO
    };

    onChooseCrew = (crewId: number) => {
        const { availableCrews } = this.state;
        const selectedCrew = availableCrews.find(c => c.crew_id === crewId);
        this.setState({
            selectedCrew,
        });
    }

    render() {
        const { address, availableCrews, selectedCrew } = this.state;
        return (
            <Container>
                <h1>Детали заказа</h1>
                <div style={{ margin: '10px 0' }}>
                    <Label>Откуда</Label>
                    <Input onChange={this.onChange} value={address}/>
                </div>
                {selectedCrew &&
                    <CrewCard crew={selectedCrew}/>
                }
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <Map crews={availableCrews} onClick={this.onChoosePoint}/>
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
                            >
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

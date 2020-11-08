import React from 'react';
import { Card, Grid, Icon, Label } from 'semantic-ui-react';
import { CrewInfo } from '../services/requestTypes';

interface Props {
    crew: CrewInfo;
}

export default class CrewCard extends React.Component<Props> {
    render() {
        const { crew } = this.props;
        return (
            <Card>
                <Card.Content>
                    <Card.Header>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={2}>
                                    <Icon name='car' size='large'/>
                                </Grid.Column>
                                <Grid.Column width={14}>
                                    {`${crew.car_model} ${crew.car_mark}`}
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Card.Header>
                    <Grid>
                        <Grid.Row style={{ paddingTop: 0 }}>
                            <Grid.Column width={2}/>
                            <Grid.Column width={14}>
                                <Card.Meta>
                                    {crew.car_color}
                                </Card.Meta>
                                <Label>{crew.car_number}</Label>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                </Card.Content>
            </Card>
        );
    }
}

import {Container,Grid,Image,Header,Segment, Icon,Comment, Form} from 'semantic-ui-react';



function my(){
    return(<Container>
        <Grid>
            <Grid.Row>
            <Grid.Column width={3}>
                個人頭貼
                <Image src='data:image/png;base64,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'/>
            </Grid.Column>
            <Grid.Column width={10}>
            <Header>個人資訊</Header>
                <Segment basic vertical>
                系所: 資工
                    </Segment>
                <Segment basic vertical>
                   
                   住家: 桃園
                </Segment>
                <Segment basic vertical>

                   年級: 大二

                </Segment>
                <Segment basic vertical>
                   學校: 長庚
                </Segment>
              
                </Grid.Column>
            <Grid.Column width={3}>
            <Header>朋友列表</Header>
            <Segment basic vertical>
                   沒朋友QQ
                </Segment>
              </Grid.Column>
            </Grid.Row>
            
        </Grid>
        </Container>)

}


export default my;
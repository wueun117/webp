// import { formatMs } from '@material-ui/core';
import {Grid,Image,Item,Icon,Container} from 'semantic-ui-react';
import Topics from '../components/Topics';
import firebase from '../utils/firebase';
import React from 'react';
import {Link} from 'react-router-dom';
import { lime } from '@material-ui/core/colors';



function Posts(){
    const [posts,setPosts]=React.useState([]);
    React.useEffect(() =>{
        firebase
        .firestore()
        .collection("posts")
        .get()
        .then((collectionSnapshot) => {
            const data = collectionSnapshot.docs.map(docSnapshot =>{
                const id =docSnapshot.id;
                return {...docSnapshot.data(),id};
            });
            setPosts(data);
        });
    },[]);

    return (
        <Container>
    <Grid>
        <Grid.Row>
        <Grid.Column width={3}>
            <Topics/>
        </Grid.Column>
        <Grid.Column width={10}>
            <Item.Group>
                {posts.map((post) =>{
                        return (
                        <Item key={post.id} as={Link} to={`/posts/${post.id}`}>
                            <Item.Image src={post.imageUrl || 
                                "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwoNDQ0NDRAQDQ0KDQ0IDQ0ODQ8ICggNFREWFhURExUYKCggGBolGxMTITEhJSkrLi46Fx8zODMtNygtLisBCgoKDg0NDw0ODysZFRkrKystKystLSsrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOAA4AMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQMEBQYCB//EACoQAQACAQIFAwQCAwAAAAAAAAABAgMEEQUSITFSFEFRIjJhcYGhBjND/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD7EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiZhF7xEdXP8W4xMfRTrv0mY9gbbVcQx4+8xP87sC/+R4a+0ubtz3neZlMYQdLi/yDDadttt2ywaml43iY6/lw84p9uj3g1GTFO+8z/IO8Gp4XxSuWNrdJjo2wAAAAAAAAAAAAAAAAAAAKtTk5Kzb4BqeO6/lry1nr2lztKbzMz3nqu1uSb5bT7fCawCIq9bAgbPF6xL2Apw3nFaLR7Tu6/huqjLSLOSyV3hsOAaiYyRT2/pR1IiJSAAAAAAAAAAAAAAAAA13G8m2G3y2LTcen6ZgHPYuvVbCvF2WIAAAAEwjS35Mm6VV+kg7XTTvjrPzC1Tof9OP9LlAAAAAAAAAAAAAAAABp+O1+mZbhgcYx82KwOXx+z3s8Vjbo9gbGwAbGwAK7RvKyXrSU5skQDrdHG2HH+lrzhjbHWPiHoAAAAAAAAAAAAAAAABXmpzRt8rAHIa7HNMlvhVDf8X0fNXevWe7n5iYnaQSAABIItLacB0szeLz2a/TYLZLREdt9nWaLTxix8oLpQAAAAAAAAAAAAAAAAAAAItG7ScV0VY+qsfmW7mYarjGavLMRPsDn6y9K8awBEdZiPmdkvG+1o/cA6vh2ipjrE7dZ6s2ZU6fLWaU2n2iFoAAAAAAAAAAAAAAAAAqy5qVjeZjp7btPruO0rvWI3n5gG5y5a1jeWu1PG8FekT1c3n1ubJPS0xHwpjHM9Z6oNlquOZp+zsxLanJf7nmuKFkVEKw9EACu8LCYBFOI58fbtDZ6Tj0f9Jaq1FV8IOx0/EMOT7ZZbga2y0+2ZjZstDxq1NovvP5VXWDD0nEMeSIneI3ZcTE9gSAAAAAAAACrPmrSJmfaNwe72iI3ns1fEOMUpG1JiZ+Gq4jxe15muOdo7NZFJtO9u8gu1Wty5p67x+p2VUw/PX+11aRD3sgrrjh7iEggAAAAACUSAImqq+JcAxa89J3iZbfh/G7x9N+kdmDNVN8MA7PT6rHk+2d2Q4bBqcuKfpnaIdBw7jFL7Vt93afZVbkea2iY3id/7egAAAARLmOPay1pitZ226S6e3af04rUzM5b/iwKsWNdEEJRAAAAAAAAAAAAAAAkAeLUiVNq2rO8dP10ZKLQDa8A1tpjkt1mZ26ugcfwmds9I+ZdjbuqoAAABFu0/px2sptkt+ZdjLQcW0OSbRNK77z1QauBkRoNT4Sn0Gp8JEYwyfQanwk9BqfCQYwyfQanwk9BqfCQYwyfQanwk9BqfCQYwyfQanwk9BqfCQYwyfQanwk9BqfCQYwyfQanwk9BqfCQYwyfQanwk9BqfCQYwyfQanwk9BqfCQYxLJ9BqfCUToNT4SBwim+ak/Eutv3abgmhvX6rxtMS3MyqoAAAAABPNJzSgBPNJzSgBPNJzSgBPNJzSgBPNJzSgBPNJzSgBPNJzSgBPNJzSgBPNJzSgBPNJzSgBPNKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/9k="}/>
                            <Item.Content>
                                <Item.Meta>
                                  {post.author.photoURL ? (
                                  <Image src={post.author.photoURL} /> 
                                  ) : ( <Icon name="user circle" />
                                )}·
                                {post.topic} · { post.author.displayName || '使用者'}
                                </Item.Meta>
                                <Item.Header>{post.title}</Item.Header>
                                <Item.Description>{post.content}</Item.Description>
                                <Item.Extra>留言 {post.commentsCount || 0} · 讚 {post.likedBy?.length || 0} </Item.Extra>
    
                            </Item.Content>
                        </Item>
             
                    );
                })}
            </Item.Group>
            </Grid.Column>
        <Grid.Column width={3}>朋友列</Grid.Column>
        </Grid.Row>
        
    </Grid>
    </Container>
    );
}

export default Posts;


    
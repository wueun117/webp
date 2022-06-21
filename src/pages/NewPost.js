import {Container,Header,Form,Image,Button} from 'semantic-ui-react';
import React, {useState,useEffect} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {useHistory} from 'react-router-dom';
import 'firebase/compat/storage';




function NewPost()
{
    const history=useHistory();
    const [title,setTitle]=React.useState('');
    const[content,setContent]=React.useState('');
    const[topics,setTopics]=React.useState([]);
    const[topicName,setTopicName]=React.useState("");
    const[file,setFile]=React.useState(null);
    const [isLoading,setIsLoading]=React.useState(false);

    React.useEffect(() => {
        firebase
        .firestore()
        .collection('topics')
        .get()
        .then((collectionSnapshot) => {
            const data = collectionSnapshot.docs.map((doc) =>{
                return doc.data();
            });
            setTopics(data);
        });
    },[]);

    const options=topics.map(topic => {
        return {
            text:topic.name,
            value:topic.name
        };
    });

    const previewUrl=file 
    ? URL.createObjectURL(file)
    :'https://photo69.macsc.com/JPG-180507/180507_294/OT07VVMvxb_small.jpg'



    function onSubmit() {
        setIsLoading(true);
        const documentRef= firebase.firestore().collection('posts').doc();
        const fileRef=firebase.storage().ref('post-images/'+documentRef.id);
        const metadata ={
            contentType: file.type
        };
        fileRef.put(file,metadata).then(() => {
            fileRef.getDownloadURL().then((imageUrl) => {
                documentRef
        
        .set({
            title,
            content,
            topic: topicName,
            createdAt: firebase.firestore.Timestamp.now(),
            author: {
                displayName: firebase.auth().currentUser.displayName ||" ",
                photoURL: firebase.auth().currentUser.photoURL || " ",
                uid: firebase.auth().currentUser.uid,
                email: firebase.auth().currentUser.email,
            },
            imageUrl,
        })
        .then(() => {
            setIsLoading(false);
            history.push('/');
        });
                

            });
        });
    }


    return (
        <Container>
            <Header>發表文章</Header>
            <Form onSubmit={onSubmit}>
                <Image src={previewUrl} size="small" floated="left"/>
                <Button basic as="label" htmlFor="post-image">上傳圖片</Button>
                <Form.Input 
                type="file" 
                id="post-image" 
                style={{display:'none'}}
                onChange={(e) => setFile(e.target.files[0])}
                />
                <Form.Input 
                placeholder="輸入文章標題"
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                />
                <Form.TextArea 
                 placeholder="輸入文章內容"
                 value={content}
                 onChange={(e) => setContent(e.target.value)}
                />
                <Form.Dropdown
                placeholder="選文章主題"
                options={options}
                selection
                value={topicName}
                onChange={(e,{value}) => setTopicName(value)}
                />
                <Form.Button loading={isLoading}>送出</Form.Button>
            </Form>
        </Container>
    )
}
export default NewPost;



// import { Container ,Image,Button} from "semantic-ui-react";
// import{Header,Form} from 'semantic-ui-react';
// import React, {useState,useEffect} from 'react'
// // import 'firebase/compat/firestore';
// import firebase from '../utils/firebase';
// import{useHistory} from 'react-router-dom';
// import 'firebase/compat/storage';
// import 'firebase/compat/auth';



// function NewPost() {
//     const [title,setTitle]=useState('');
//     const [content,setContent]=useState('');
//     const [topics,setTopics]=useState([]);
//     const [topicName,setTopicName]=useState("");
//     const [file,setFile]=useState(null);
//     const history=useHistory();
//     const[isLoading,setIsLoading]=useState(false);


    // useEffect(()=>{
    //     firebase
    //     .firestore()
    //     .collection('topics')
    //     .get()
    //     .then((collectionSnapshot)=>{
    //         const data=collectionSnapshot.docs.map((doc)=>{
    //             return doc.data();
    //         });
    //         setTopics(data);
    //     });
    // },[]);











// const options=topics.map(topic=>{
//     return{
//         text:topic.name,
//         value:topic.name
    
//     };
// });




// const previewUrl=file? URL.createObjectURL(file)
// :"https://react.semantic-ui.com/images/wireframe/image.png" ;





// function onSubmit(){
//     setIsLoading(true);
//     const documentRef= firebase.firestore().collection('posts').doc();
//     const fileRef=firebase.storage().ref('post-images/'+documentRef.id)
//     const metadata={
//         contentType:file.type
//     };
//         fileRef.put(file,metadata).then(()=>{
//             fileRef.getDownloadURL().then((imageUrl)=>{
//             documentRef
//             .set({
//                 title,
//                 content,
//                 topic:topicName,
//                 createAt:firebase.firestore.Timestamp.now(),
//                 author:{
//                     displayName:firebase.auth().currentUser.displayName|| " ",
//                     photoURL: firebase.auth().currentUser.photoURL|| " ",
//                     uid:firebase.auth().currentUser.uid,
//                     email:firebase.auth().currentUser.email,
//                     // imageUrl,
//                 },

//                 imageUrl,
//             })
//                 .then(()=>{
//                 setIsLoading(false);
//              history.push('/');
//             });
//         });
//     });
    
// }





















//     return (
//         <Container> 
//             <Header>發表文章</Header>
//             <Form onSubmit={onSubmit}>
//                 <Image 
//                 src={previewUrl}
//                 size="small"
//                 floated="left"
//                 />
//                 <Button basic as ="label" htmlFor="post-image" >
//                     上傳文章圖片
//                 </Button>
               
                

//                 <Form.Input type="file" 
//                 id="post-image" 
//                 style={{display:'none'}} 
//                 onChange={(e)=>setFile(e.target.files[0])}
//                 />
                

                
//                 <Form.Input 
//                     placeholder="請輸入文章標題" 
//                     value={title}
//                     onChange={(e)=>setTitle(e.target.value)}>

//                 </Form.Input>


//                 <Form.TextArea
//                     placeholder="請輸入文章內容" 
//                     value={content}
//                     onChange={(e)=>setContent(e.target.value)}

//                 />

//                 <Form.Dropdown
//                     placeholder="選擇文章主題"
//                     options={options}
//                     selection
//                     value={topicName}
//                     onChange={(e,{value})=>setTopicName(value)}
//                 />




//                 <Form.Button loading={isLoading}>送出</Form.Button>

//             </Form>
//         </Container>




//     )
        
    
// }

// export default NewPost;
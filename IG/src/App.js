import { BrowserRouter,Switch,Route } from "react-router-dom";

import Header from "./Header";
import Signin  from "./pages/Signin";
import Posts from './pages/Post';
import NewPost from "./pages/NewPost";
import Post from './pages/Postss';
import My from "./pages/My";


function App(){
  return (
  <BrowserRouter>
  <Header/>
  <Switch>
    <Route path="/" exact>
      <Posts/>
    </Route>
    <Route path="/signin" exact>
      <Signin/>
    </Route>
    <Route path="/My" exact>
      <My/>
    </Route>
    <Route path="/new-post" exact>
      <NewPost/>
      </Route>
    <Route path="/posts/:postId" exact>
      <Post />
    </Route>
  </Switch>
  </BrowserRouter>
  );
}

export default App;
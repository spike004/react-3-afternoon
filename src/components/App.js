import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Post from './Post/Post';
import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }



  updatePost(id, text) {
    let promise = axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text })
    promise.then(res => {
      console.log(res)
      this.setState({ posts: res.data })
    })
  }

  deletePost( id ) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ id }`).then( results => {
      this.setState({ posts: results.data });
    });
  }

  createPost(text) {
axios.post('https://practiceapi.devmountain.com/api/posts',{text}).then(results=>{
  this.setState({posts: results.data})
})
  }
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then(results => {
      this.setState({ posts: results.data });
    });
  }
  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">


          <Compose createPostFn={this.createPost}/>
          {
            posts.map(post => (
              <Post key={post.id}
                text={post.text}
                date={post.date}
                id={post.id}
                updatePostFn={this.updatePost}
                deletePostFn={this.deletePost}

              />

            ))
          }
        </section>
      </div>
    );
  }
}

export default App;

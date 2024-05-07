import { useState , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as React from 'react'
const API_ENDPOINT ="https://hn.algolia.com/api/v1/search?query=";


const App = () => 
{

const initialstories = [
  {title: "React",
  url:"https://reactjs.org/",
  author: "jordan walke",
  num_comments: 3,
  points: 4,
  objectsID: 0,
  },
  { 
  title: "Redux",
  url:"https://redux.js.org/",
  author: "dan abramov, andrew clark",
  num_comments: 2,
  points: 5,
  objectsID: 1,

  },

];
const [searchTerm , setsearchTerm] = React.useState(localStorage.getItem('search') ||'React');

  
const [stories , setStories ] = React.useState(initialstories);
const handleRemoveStory =(item) => {
  const newStories =stories.filter (
    (story) => item.objectsID !== story.objectsID 
  );
  setStories( newStories);
};
const handleChange = (a) => {
  
  setsearchTerm (a.target.value);};

React.useEffect(() => { 
  localStorage.setItem('search', searchTerm);
} , [searchTerm] );


const [isLoading, setIsLoading] = React.useState(false);
const [isError, setIsError] = React.useState(false);
const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`);
const handleSearchSubmit = () => {
setUrl(`${API_ENDPOINT}${searchTerm}`);
};

React.useEffect(() => {
  if (!searchTerm) return;
  setIsLoading(true);

  fetch(url)
  .then((response) => {
    response.json()
    .then((result) =>{ 
      setIsLoading(false);

      setStories(result.hits);})
  //Handle response
  })
  .catch(() => {
  //Handle Error
  setIsLoading(false);
setIsError(true);

  });
  }, [url]);

const searchedStories=stories.filter(function(story){
  return story.title.toLowerCase().includes(searchTerm.toLowerCase());
});

const promise = new Promise (( resolve, reject) => {
  reject (new Error("failure!"));
});
promise.catch (error => console.log(error.message));

return (
    
   <div>
    
    <h1> My hacker stories</h1>
    <InputWithLabel
      id="search"
      value={searchTerm}
      onInputChange={handleChange}
      >
      <strong>
      Search: 
      </strong>
      
    </InputWithLabel>
    <button
type="button"
disabled={!searchTerm}
onClick={handleSearchSubmit} >
Submit
</button>
    <hr/>
    {isError && <p>Something went wrong ...</p>}
    {isLoading ? (
<p>Loading ...</p>
) : (

    <List list={stories} onRemoveItem={handleRemoveStory}/>
    
)}

    
   </div>
  );
};


         
const InputWithLabel = ({
  id,
  value ,
  type ='text', 
  onInputChange,
  children ,
})=> (
    <div>
      
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input 
      id={id}
      type= {type}
      value={value} 
      onChange={onInputChange} />
      

    </div>
  );
  const List = ({ list, onRemoveItem }) =>
 (
  <ul>
      {list.map((item) =>
        ( <Item key={item.objectsID}
          item ={item}
          onRemoveItem={onRemoveItem}/>
      
        )
      )}
    </ul>
  );
  const Item =({ item , onRemoveItem }) => (
    <li>
      <span>
     <a href={item.url}>{item.title}</a>
     </span>
         <span>{item.author}</span>
         <span> {item.num_comments} </span>
         <span>{item.points}</span>
         <span>
          <button type="button" onClick={()=> onRemoveItem (item)}>
            Dismiss
          </button>
         </span>
    </li>

  );

export default App
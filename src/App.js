import './App.css';
import Navinshorts from './components/Navinshorts';
import NewsContent from './components/NewsContent/NewsContent';
import Footer from './components/Footer';
import apiKey from "./data/config";
import {useState,useEffect} from "react";
import axios from 'axios';
function App() {
  const [category, setCategory]= useState("general");
  const [newsArray, setNewsArray] = useState([]);
  const [newsResults, setNewsResults]=useState();
  const [loadmore, setLoadmore]=useState(20);
  const newsApi = async()=>{
    try{
         const proxyUrl="https://cors-anywhere.herokuapp.com/"
         const news = await axios.get(`https://${proxyUrl}newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}&category=${category}&pageSize=${loadmore}`);
         setNewsArray(news.data.articles);
         setNewsResults(news.data.totalResults);
        //  console.log(news.data.articles)
    } catch (error){
      console.log(error)
    }
  }
  useEffect(() => {
    newsApi();
    // eslint-disable-next-line
  }, [newsResults, category, loadmore]);

  
  return (
    <div className="App">
     <Navinshorts setCategory={setCategory}/>
     <NewsContent loadmore={loadmore} setLoadmore={setLoadmore} newsArray={newsArray} newsResults={newsResults}/>
     <Footer/>
    </div>
  );
}

export default App;

import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News= (props)=> {

  const [articles,setArticles]=useState([])
  const [loading,setLoading]=useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  // constructor(){
  //   super();
  //   this.state={
  //     articles: [],
  //     loading: true,
  //     page:1,
  //     totalResults:0
  //   }
  // }

  const updateNews = async (pageNo) => {
    props.setProgress(10);
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=04468f16a0b147da8b61fc590e987ad2&page=${page}&pageSize=${props.pageSize}`;
     setLoading(true);
     let data = await fetch(url);
     props.setProgress(30);
     let parsedData = await data.json();
     props.setProgress(50);
 
     setArticles(parsedData.articles)
     setTotalResults(parsedData.totalResults)
     setLoading(false)
    //  this.setState({articles: parsedData.articles,
    //         totalResults: parsedData.totalResults,
    //         loading:false
    // })
    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
  
  }, [])
  

  // async componentDidMount(){
  //   this.updateNews();
  // }

  const handlePrevClick=async ()=>{
    setPage(page-1)
    updateNews();
  }

  const handleNextClick=async ()=>{
  // this.setState({page:this.state.page + 1});
    setPage(page+1)
  updateNews();
  }

  const fetchMoreData= async() => {
   
    props.setProgress(10);
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=04468f16a0b147da8b61fc590e987ad2&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page+1)
      let data = await fetch(url);
     props.setProgress(30);
     let parsedData = await data.json();
     props.setProgress(50);
  
     setArticles(articles.concat(parsedData.articles))
     setTotalResults(parsedData.totalResults)
    //  this.setState({articles: this.state.a,
    //         totalResults: 
    // })
    props.setProgress(100); 
  }



    return(
      <>
         <strong><h1 className="mb-5 text-center" style={{marginTop:'90px'}}>Global News - Top news around the World</h1></strong>
         {loading && <Spinner/>}

         <InfiniteScroll
         dataLength={articles.length}
         next={fetchMoreData}
         hasMore={articles.length !==totalResults}
         loader={<Spinner/>}
         >

              <div className="container">
              <div className="row">
                {articles.map((element)=>{ 
                  return  <div className="col-md-4" key={element.url}>
                          <NewsItem title={element.title?element.title:""} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                          </div>
                })}
              </div>
              </div>
              </InfiniteScroll>

           {/* <div className="container d-flex justify-content-between">
              <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} >&larr; Previous</button>
              <button disabled={this.state.page +1> Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
           </div> */}
      </>
    )
  }


News.defaultProps={
  country:'in',
  pageSize:8
}

News.propTypes={
  country: PropTypes.string,
  pageSize:PropTypes.number
}

export default News

// react infinite scroll component & react top loading bar

import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: "general",
    totalResults: 0
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async updateNews() {
    const { page } = this.state;
    const { country, category, pageSize } = this.props;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${this.props.apiKey}&page=${page}&pageSize=${pageSize}`;
    
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    
    // Check if parsedData.articles is defined before filtering
    const newArticles = parsedData.articles ? parsedData.articles : [];
    
    // Filter out duplicates before updating state
    const uniqueNewArticles = newArticles.filter(article => !this.state.articles.some(existingArticle => existingArticle.url === article.url));
    

    this.setState(prevState => ({
      articles: [...prevState.articles, ...uniqueNewArticles],
      totalResults: parsedData.totalResults || 0,
      loading: false
    }));
  }
  
  
  async componentDidMount() {
    this.props.setProgress(10);
    await this.updateNews();
    this.props.setProgress(100)
  }

  fetchMoreData = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }), 
    () => {
      this.updateNews();
    });
  };

  render() {
    const { articles, loading, totalResults } = this.state;

    return (
      <>
        <h1 className="text-center" style={{ marginTop: "95px", marginBottom: "25px" }}><b>NewsMonkey - Top {this.props.category} Headlines</b></h1>

        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={this.fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<h4><Spinner /></h4>}
        >
          <div className="container">
            <div className="row">
              {articles.map((article) => (
                <div className="col-md-4" key={article.url}>
                  <NewsItem
                    title={article.title || ""}
                    description={article.description || ""}
                    imageUrl={article.urlToImage || "https://elegalmetrology.jharkhand.gov.in/japnet/images/news.jpg"}
                    newsUrl={article.url}
                    author={article.author}
                    date={article.publishedAt}
                    source={article.source.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

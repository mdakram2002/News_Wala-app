import React, { Component } from 'react'
import NewsItems from './NewsItems'
import propTypes from 'prop-types'

export default class News extends Component {

    static defaultProp = {
        country: 'in',
        pageSize: '12',
        category: 'general',
    }
    static propTypes = {
        country: propTypes.string,
        pageSize: propTypes.number,
        category: propTypes.string
    }

    constructor() {
        super();
        // console.log("Hello i'am constructor from news componenets");
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1,
        };
    };
    async componentDidMount() {
        // console.log("cdm");
        if (this.state.page - 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

        } else {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}in&category=${this.props.category}&apiKey=5cde1131cc3a44e8980755af019e7e3b&page=1&pageSize=${this.state.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })
        }
    }

    handelPrevClick = async () => {
        console.log("HandelPrevClick");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}in&category=${this.props.category}&apiKey=5cde1131cc3a44e8980755af019e7e3b&page=${this.state.page-1}&pageSize=${this.state.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        // this.setState({ articles: parsedData.articles })
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        });

    }
    handelNextClick = async () => {
        console.log("HandelNextClick");

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}in&category=${this.props.category}&apiKey=5cde1131cc3a44e8980755af019e7e3b&page=${this.state.page+1}&pageSize=${this.state.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        // this.setState({ articles: parsedData.articles })
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles
        });

    }

    render() {
        // console.log("i'am render")
        return (
            <div className='container my-3'>
                <h2 className='text-center'>News Wala - Top Headlines</h2>
                <div className="row">
                    {(this.state.articles || []).map((element) => {
                        return <div className="col-md-3" key={element.url}>
                            <NewsItems title={element.title ? element.title.slice(0, 45) : ""}
                                discription={element.description ? element.description.slice(0, 65) : ""}
                                imageUrl={element.urlToImage}
                                newsUrl={element.url} />
                        </div>
                    })}
                </div>
                <div className="container2 my-3 d-flex justify-content-between">
                    <button type="button" className="btn btn-dark" disabled={this.state.page <= 1} onClick={this.handelPrevClick}> &#8249; preveiws</button>
                    <button type="button" className="btn btn-dark" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.pageSize)} onClick={this.handelNextClick}>Next &#8250;</button>
                </div>
            </div>
        )
    }
}

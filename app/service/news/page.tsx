"use client"

// https://newsapi.org/v2/top-headlines?country=au&apiKey=2599f3f0235244f29c87365e86c5fa47

//https://api.worldnewsapi.com/search-news?api-key=707885667a65470fa2ac750c6aee4f06&text=tesla
import React, { useEffect, useState } from "react"

const sourceOptions = [
    "Application",
    "Technologies",
    "Business",
    "Sports",
    "Immigration",
    "Health",
    "Sprituality",
    "Migration"
]

// GET 
interface NewsArticle {
    source: {
      id: string;
      name: string;
    };
    author: string;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
  }
  

const News =()=>{
    const [data, setData] = useState<NewsArticle[]>([])
    const [selectedSource, setSelectedSource] = useState<string | null >("world")

    const fetchData = async()=>{
        try {
            let response:any = {};
            if(selectedSource==="world"){
                //https://api.worldnewsapi.com/search-news?api-key=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&text=world
                response=   await fetch(`https://api.worldnewsapi.com/search-news?api-key=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&text=${selectedSource}`)
            }else {
                response= await fetch(`https://api.worldnewsapi.com/search-news?api-key=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&text=${selectedSource}`)
            }
            const { news } = await response?.json()
            setData(news)
        } catch (error) {
                console.log(error)
        }
    }

    useEffect(()=>{
        fetchData()
    },[selectedSource])

    return <div className="flex min-h-screen flex-col items-center justify-between p-24">
       <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Latest News</h1>
      <div className="mb-4">
        <label className="mr-2">Filter by Category:</label>
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={selectedSource || ''}
          onChange={(e: React.FormEvent<HTMLSelectElement>)=> {
            let currentValue = e.target as HTMLSelectElement;
            setSelectedSource(currentValue.value)
          }}
        >
          <option value="all">All</option>
          {sourceOptions?.map((source, index) => (
            <option key={index} value={source}>
              {source}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((article, index) => (
          <div key={index} className="bg-white p-4 rounded-md shadow-md">
            {article?.image && <img src={article.image} alt="News Thumbnail" className="news-image" />}
            <h2 className="text-xl font-bold mb-2">{article.title}</h2>
            <p className="text-gray-600">{article.author}</p>
            <p className="text-gray-600">{new Date(article.publish_date).toLocaleString()}</p>
            <p className="text-gray-800 mt-2">{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-4 block hover:underline">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
    </div>
}

export default News
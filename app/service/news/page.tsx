"use client"

// https://newsapi.org/v2/top-headlines?country=au&apiKey=2599f3f0235244f29c87365e86c5fa47

//https://api.worldnewsapi.com/search-news?api-key=707885667a65470fa2ac750c6aee4f06&text=tesla
import React, { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import Loader from "@/Components/Loader";
import ErrorMessage from "@/Components/ErrorMessage";
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
    image: string | null;
    publish_date:string;
    publishedAt: string;
    content: string | null;
  }
  

const News =()=>{
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<NewsArticle[]>([])
    const [selectedSource, setSelectedSource] = useState<string | null >("world")
    const [error, setError] = useState<string>('')

    const router = useRouter()

    const fetchData = async()=>{
        setLoading(true)
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
            setLoading(false)
        } catch (error) {
                setError("Error fetching...")
                setLoading(false)
        }
    }

    useEffect(()=>{
        fetchData()
    },[selectedSource])


    const RenderData = ()=>{

      if(loading)return <div >
        <Loader />
    </div>

    if(error) return <ErrorMessage message={error} />

    return (
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
    )
    }

    

    return <div className="flex min-h-screen flex-col items-start p-24">
       <button onClick={()=>router.back()} className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
      Go Back
    </button>
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
            {RenderData()}
    </div>
    </div>
}

export default News
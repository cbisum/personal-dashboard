import { NextResponse } from "next/server"
import NewsAPI  from "newsapi"

export async function GET(){
    const newsapi = new NewsAPI("2599f3f0235244f29c87365e86c5fa47")

        const allNews = await newsapi.v2.topHeadlines({
            sources: 'bbc-news,the-verge',
            q: 'bitcoin',
            category: 'business',
            language: 'en',
            country: 'au'
        })

        return NextResponse.json({hello:"world"})
}
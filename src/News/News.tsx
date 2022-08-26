import "./News.css";

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Logo from '../logo.svg'

import axios from 'axios';
import { useCallback, useEffect, useState } from "react";
import { CardActionArea } from "@mui/material";

const returnNewsMap = async () => {
    let disasters = ['earthquake', 'floods', 'wildfire', 'avalanche', 'landslide', 'cyclone', 'drought']

    const formatDate = (date: Date) => {
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        return `${year}-${month + 1}-${day}`
    }

    var today = new Date()
    var lastMonthDate = new Date(today);
    lastMonthDate = new Date(lastMonthDate.setMonth(lastMonthDate.getMonth() - 1));
    var from = formatDate(lastMonthDate)
    var to = formatDate(today)

    var news = []

    while (news.length <= 5) {
        let randomNum = Math.floor(Math.random() * disasters.length)
        let data = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: disasters[randomNum],
                sortBy: 'relevance',
                searchIn: 'title',
                pageSize: '1',
                from: from,
                to: to,
                apiKey: '06ded3314a5348c7b9545d553f0aca55'
            }
        }).then(res => res.data)
        if (!news.map(e => e.url).includes(data.articles[0].url)) {
            news.push({
                url: data.articles[0].url,
                image: data.articles[0].urlToImage,
                title: data.articles[0].title,
                description: data.articles[0].description,
                author: data.articles[0].author
            })
        }
    }
    return news
}

interface NewsInterface {
    url: string;
    image: string;
    title: string;
    description: string;
    author: string;
}


export default function News() {
    const theme = useTheme();
    const [newsData, setNewsData] = useState<NewsInterface[]>([])
    useEffect(() => {
        returnNewsMap().then(res => setNewsData(res))
    }, [])
    return (
        <>
            {newsData.map(({ url, image, title, description, author }: NewsInterface, i: number) => (
                <Card style={{ width: '40vw' }} sx={{ display: 'flex', flexDirection: "row" }} key={i}>
                    <CardActionArea href={url} target="_blank" sx={{ display: 'flex', flexDirection: "row" }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <CardContent sx={{ textOverflow: "ellipsis" }}>
                                <Typography component="div" variant="h5" overflow="hidden">
                                    {title}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {author}
                                </Typography>
                                <Typography variant="subtitle2" component="div">
                                    {description}
                                </Typography>
                            </CardContent>
                        </Box>
                        <CardMedia
                            component="img"
                            sx={{ width: 'auto', height: 151, display: 'flex', flexDirection: 'column', justifyContent: "flex-start" }}
                            image={image}
                            alt="Live from space album cover"
                        />
                    </CardActionArea>
                </Card>
            ))}
        </>
    );
}
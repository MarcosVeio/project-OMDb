import { Card, Divider, Drawer, Empty, message, Button, PageHeader } from 'antd'
import 'antd/dist/antd.css'
import { useState } from 'react'
import { useFavContext } from '../../Context/favourites'
import '../../styles.css'
import { LoadingOutlined, DeleteOutlined, StarFilled } from '@ant-design/icons';
import { ContentOfDrawer } from '../../Components/ContentOfDrawer/ContentOfDrawer'
import { getInfoOfMovie } from '../../Services/getInfoOfMovie.js/getInfoOfMovie'

const { Meta } = Card
const Favourites = () => {
    const { favourites, removeMovie } = useFavContext()
    const [loadingDrawer, setLoadingDrawer] = useState(true)
    const [visible, setVisible] = useState(false)
    const [contentDrawer, setContentDrawer] = useState([])

    const Rating = (movie) => {
        const listRatings = movie.Ratings.map((Ratings) => Ratings)
        if (listRatings[1] === undefined) {
            return '0'
        } else {
            return listRatings[1].Value
        }
    }

    const removeMovieOfFavourites = (movie) => {
        removeMovie(movie)
        setVisible(false)
        message.success('Movie removed of favourites')
    }

    const showLargeDrawer = async (id) => {
        setVisible(true)
        setLoadingDrawer(true)
        const { data } = await getInfoOfMovie(id)
        const movie = data
        console.log([movie])
        const content =
            <div key={movie.imdbID}>
                <ContentOfDrawer Runtime={movie.Runtime}
                    Year={movie.Year}
                    Plot={movie.Plot}
                    Poster={movie.Poster}
                    Title={movie.Title}
                    imdbRating={movie.imdbRating}
                    Rating={Rating(movie)}
                    buttonFavourites={
                        <button onClick={() => removeMovieOfFavourites(movie)} className="buttonTag" ><StarFilled style={{ color: "#ff9f1c" }} /> REMOVE OF FAVOURITES</button>
                    }
                />
            </div>
        setContentDrawer(content)
        setLoadingDrawer(false)
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>MY FAVOURITES</h1>
            </div>
            <Divider />
            {
                favourites.length === 0 ?
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </div> :
                    <div className="container">
                        {favourites.map((data) => {
                            return (
                                <Card
                                    id="card"
                                    key={Math.floor(Math.random() * 1000000)}
                                    style={{ width: 200 }}
                                    cover={<img alt={data.Title} src={data.Poster} onClick={() => showLargeDrawer(data.imdbID)} />}
                                    actions={[<DeleteOutlined key="favorite" onClick={() => removeMovieOfFavourites(data)} />]}>
                                    <Meta
                                        onClick={() => showLargeDrawer(data.imdbID)}
                                        title={data.Title}
                                        description={data.Year}
                                    />
                                </Card>
                            )
                        })}
                    </div>
            }
            <Drawer
                placement="right"
                width={836}
                onClose={() => setVisible(false)}
                visible={visible}
                destroyOnClose={true}
                extra={
                    <button>teste</button>
                }
            >
                {loadingDrawer ? <LoadingOutlined /> : contentDrawer}
            </Drawer>
        </>
    )
}

export default Favourites
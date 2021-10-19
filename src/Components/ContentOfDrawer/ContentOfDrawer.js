import { Divider } from 'antd'
import { Tag } from '../Tag/Tag'
import './style.css'

export const ContentOfDrawer = ({ buttonFavourites, Runtime, Year, Plot, Poster, Title, imdbRating, Rating, onClick }) => {
    return (
        <>
            <div className="container-drawer-info">
                <div className='text'>
                    <p>{Runtime}</p>
                    <Divider type="vertical" />
                    <p>{Year}</p>
                </div>
                <h1 style={{ fontSize: 50, color: '#000b16ee', fontWeight: 700 }}>{Title}</h1>
                <div className="container-button">
                    <Tag title="IMDb" content={`${imdbRating}/10`} backgroundTitle="#ff9f1c" />
                    <Tag title="LIKE" colorTitle="white" content={Rating} backgroundTitle="#ff4040" />
                    {buttonFavourites}
                </div>
                <h3 style={{ color: '#000b16ee' }}>Plot<br /><span style={{ opacity: 0.7 }}>{Plot}</span></h3>
            </div>
            <div className="container-drawer">
                <img alt={Title} src={Poster} ></img>
            </div>
        </>
    )
}
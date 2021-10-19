import { useFavContext } from '../../Context/favourites'

export const FavouritesAction = ({ data, contentFavorited, contentNoFavorited }) => {
    const { favourites } = useFavContext()
    let count = 0

    for (const favourite of favourites) {
        if (favourite.imdbID === data.imdbID) {
            count = count + 1
        }
    }

    if (count > 0) {
        return (
            contentFavorited
        )
    } else {
        return (
            contentNoFavorited
        )
    }
}
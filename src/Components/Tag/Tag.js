import './style.css'

export const Tag = ({ title, content, backgroundTitle, colorTitle }) => {
    return (
        <>
            <div className="button" >
                <div className="title" style={{ backgroundColor: backgroundTitle, color: colorTitle }}>{title}</div>
                <div className="info">{content}</div>
            </div>
        </>
    )
}
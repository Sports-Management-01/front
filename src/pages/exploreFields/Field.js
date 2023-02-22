import './Field.css'
import useEmblaCarousel from 'embla-carousel-react'

const Field = ({field}) => {
    const [emblaRef] = useEmblaCarousel()
    console.log(field.image)
    return (
        <div className="field">
            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                    {field?.image.map((img, j) => {
                        return <img src={img.url} key={j} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Field
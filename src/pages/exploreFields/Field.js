import './Field.css'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Link } from 'react-router-dom'
import SportsScoreIcon from '@mui/icons-material/SportsScore';


const Field = ({ field, delay = 2000 }) => {
    const [emblaRef] = useEmblaCarousel({}, [Autoplay({delay})])
    return (
        <div className="field mb-5">
            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                    {field?.image.map((img, j) => {
                        return <div key={j} className='embla__slide embla__slide__padded' style={{
                            backgroundImage: `url(${img.url})`,
                            backgroundSize: 'cover'
                        }}></div>
                    })}
                </div>
            </div>
            <div className='row my-4'>
                <div className='col'>
                    <h3>{field?.name}</h3>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col'>
                    <div className='d-flex align-items-start'>
                        <svg className='mr-2 d-inline-flex' xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24">
                            <path d="M10.452 2l8.271 8.265-5.431 5.279-8.292-8.314v-5.23h5.452zm.828-2h-8.28v8.058l10.271 10.296 8.302-8.07-10.293-10.284zm-1.72 6.559c-.585.585-1.535.585-2.12 0-.586-.584-.586-1.533 0-2.118.585-.585 1.535-.585 2.12 0 .586.584.586 1.533 0 2.118zm11.01 7.407l1.43 1.409-8.688 8.625-10.312-10.317v-2.833l10.349 10.291 7.221-7.175z" />
                        </svg>
                        <div>
                            <strong>Category</strong><br />
                            <span>{field.Category.name}</span>
                        </div>
                    </div>
                </div>
                
                <div className='col'>
                    <div className='d-flex align-items-start'>
                        <svg className='mr-2 d-inline-flex' xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z" /></svg>
                        <div>
                            <strong>Time</strong><br />
                            <span>{field.from} - {field.to}</span>
                        </div>
                    </div>
                </div>
               
            </div>

            <div className='row mt-3'>
                <div className='col'>
                    <div className='d-flex align-items-start'>
                        <svg className='mr-2 d-inline-flex' xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4 14.083c0-2.145-2.232-2.742-3.943-3.546-1.039-.54-.908-1.829.581-1.916.826-.05 1.675.195 2.443.465l.362-1.647c-.907-.276-1.719-.402-2.443-.421v-1.018h-1v1.067c-1.945.267-2.984 1.487-2.984 2.85 0 2.438 2.847 2.81 3.778 3.243 1.27.568 1.035 1.75-.114 2.011-.997.226-2.269-.168-3.225-.54l-.455 1.644c.894.462 1.965.708 3 .727v.998h1v-1.053c1.657-.232 3.002-1.146 3-2.864z" /></svg>
                        <div>
                            <strong>Hour Price</strong><br />
                            <span>${field.hourPrice}</span>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className='d-flex align-items-start'>
                        <svg className='mr-2 d-inline-flex' xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24"><path d="M5 20c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm19-4v8h-24v-24h8v16h16zm-22 0h4v-2h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-2h-4v14zm20 2h-2v3h-1v-3h-2v2h-1v-2h-2v3h-1v-3h-2v2h-1v-2h-2v3h-1v-3h-5v4h20v-4z" /></svg>
                        <div>
                            <strong>Dimension</strong><br />
                            <span>{field.width}m × {field.length}m</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row mt-3 address-row'>
                <div className='col'>
                    <div className='d-flex align-items-start'>
                        <svg className='mr-2 d-inline-flex' xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24"><path d="M12 2c3.196 0 6 2.618 6 5.602 0 3.093-2.493 7.132-6 12.661-3.507-5.529-6-9.568-6-12.661 0-2.984 2.804-5.602 6-5.602m0-2c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" /></svg>
                        <div>
                            <strong>Address</strong><br />
                            <span><a target='_blank' href={`https://www.google.com/maps/?q=${field.latitude},${field.longitude}`}>{field.adress}</a></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mt-1'>
                <div className='col d-flex justify-content-end'>
                    <Link to={`/fieldDetails/${field.id}`} className='book-now-btn btn-sm py-2 px-3'>
                        Book Now
                        <svg className='ml-1 d-inline-block' viewBox='0 0 24 24 ' width="20" height="20" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path fill='#000' d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/></svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Field